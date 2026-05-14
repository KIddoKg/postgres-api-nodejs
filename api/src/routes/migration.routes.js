const express = require('express');
const router = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/auth');
const { Province, District, Ward } = require('../models');
const { getPool } = require('../config/sqlserver');
const { DB_MODE } = require('../config/dbStrategy');
const { successResponse, errorResponse } = require('../utils/response');

// ─── Helper: đếm bản ghi ──────────────────────────────────────────────────────
const getPgStats = async () => ({
  provinces: await Province.count(),
  districts: await District.count(),
  wards:     await Ward.count(),
});

const getMssqlStats = async () => {
  const pool = await getPool();
  const [p, d, w] = await Promise.all([
    pool.request().query('SELECT COUNT(*) AS total FROM Provinces'),
    pool.request().query('SELECT COUNT(*) AS total FROM Districts'),
    pool.request().query('SELECT COUNT(*) AS total FROM Wards'),
  ]);
  return {
    provinces: p.recordset[0].total,
    districts: d.recordset[0].total,
    wards:     w.recordset[0].total,
  };
};

const calcProgress = (pg, ms) => {
  if (!ms || ms === 0) return 100;
  return Math.min(100, Math.round((pg / ms) * 100));
};

// ─── GET /api/migration/status ────────────────────────────────────────────────
router.get('/status', authenticate, requireAdmin, async (req, res) => {
  try {
    const pgStats = await getPgStats();
    let mssqlStats = null;
    let mssqlConnected = false;

    if (DB_MODE === 'dual' || DB_MODE === 'sqlserver') {
      try {
        mssqlStats = await getMssqlStats();
        mssqlConnected = true;
      } catch (err) {
        mssqlStats = { error: err.message };
      }
    }

    return successResponse(res, {
      db_mode: DB_MODE,
      postgres: { connected: true, ...pgStats },
      sqlserver: { connected: mssqlConnected, ...mssqlStats },
      migration_progress: mssqlConnected ? {
        provinces: calcProgress(pgStats.provinces, mssqlStats.provinces),
        districts: calcProgress(pgStats.districts, mssqlStats.districts),
        wards:     calcProgress(pgStats.wards, mssqlStats.wards),
      } : null,
    });
  } catch (err) {
    return errorResponse(res, 500, 'InternalError', err.message);
  }
});

// ─── POST /api/migration/sync ─────────────────────────────────────────────────
// target: 'all' | 'provinces' | 'districts' | 'wards'
// Dùng SSE (Server-Sent Events) để stream log realtime về client
router.post('/sync', authenticate, requireAdmin, async (req, res) => {
  const { target = 'all' } = req.body;

  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (type, data) => {
    res.write(`data: ${JSON.stringify({ type, ...data })}\n\n`);
  };

  const log  = (msg)  => send('log',  { message: msg });
  const done = (stats) => send('done', { stats });
  const err  = (msg)  => send('error', { message: msg });

  try {
    log('🔌 Kết nối SQL Server...');
    const pool = await getPool();
    log('✅ SQL Server connected');

    const BATCH_SIZE = 500;
    const stats = {};

    // ── Helper upsert ────────────────────────────────────────────────────
    const upsertBatch = async (Model, records, updateCols) => {
      await Model.bulkCreate(records, { updateOnDuplicate: updateCols });
    };

    // ── Sync Provinces ───────────────────────────────────────────────────
    const syncProvinces = async () => {
      log('🔄 Đang sync Provinces...');
      const result = await pool.request().query(
        'SELECT ProvinceCode,ProvinceName,ProvinceNameEn,FullName,FullNameEn,CodeName,AdministrativeUnit,AdministrativeUnitEn FROM Provinces'
      );
      const records = result.recordset.map(r => ({
        code: r.ProvinceCode, name: r.ProvinceName, name_en: r.ProvinceNameEn,
        full_name: r.FullName, full_name_en: r.FullNameEn, code_name: r.CodeName,
        administrative_unit: r.AdministrativeUnit, administrative_unit_en: r.AdministrativeUnitEn,
      }));
      log(`   Lấy được ${records.length} tỉnh thành từ SQL Server`);
      for (let i = 0; i < records.length; i += BATCH_SIZE) {
        await upsertBatch(Province, records.slice(i, i + BATCH_SIZE),
          ['name','name_en','full_name','full_name_en','code_name','administrative_unit','administrative_unit_en']);
        log(`   ✅ Upsert ${Math.min(i + BATCH_SIZE, records.length)}/${records.length}`);
      }
      stats.provinces = records.length;
      log(`✅ Provinces hoàn thành: ${records.length} bản ghi`);
    };

    // ── Sync Districts ───────────────────────────────────────────────────
    const syncDistricts = async () => {
      log('🔄 Đang sync Districts...');
      const result = await pool.request().query(
        'SELECT DistrictCode,DistrictName,DistrictNameEn,FullName,FullNameEn,CodeName,ProvinceCode,AdministrativeUnit,AdministrativeUnitEn FROM Districts'
      );
      const records = result.recordset.map(r => ({
        code: r.DistrictCode, name: r.DistrictName, name_en: r.DistrictNameEn,
        full_name: r.FullName, full_name_en: r.FullNameEn, code_name: r.CodeName,
        province_code: r.ProvinceCode, administrative_unit: r.AdministrativeUnit,
        administrative_unit_en: r.AdministrativeUnitEn,
      }));
      log(`   Lấy được ${records.length} quận huyện từ SQL Server`);
      for (let i = 0; i < records.length; i += BATCH_SIZE) {
        await upsertBatch(District, records.slice(i, i + BATCH_SIZE),
          ['name','name_en','full_name','full_name_en','code_name','administrative_unit','administrative_unit_en']);
        log(`   ✅ Upsert ${Math.min(i + BATCH_SIZE, records.length)}/${records.length}`);
      }
      stats.districts = records.length;
      log(`✅ Districts hoàn thành: ${records.length} bản ghi`);
    };

    // ── Sync Wards ───────────────────────────────────────────────────────
    const syncWards = async () => {
      log('🔄 Đang sync Wards...');
      const result = await pool.request().query(
        'SELECT WardCode,WardName,WardNameEn,FullName,FullNameEn,CodeName,DistrictCode,AdministrativeUnit,AdministrativeUnitEn FROM Wards'
      );
      const records = result.recordset.map(r => ({
        code: r.WardCode, name: r.WardName, name_en: r.WardNameEn,
        full_name: r.FullName, full_name_en: r.FullNameEn, code_name: r.CodeName,
        district_code: r.DistrictCode, administrative_unit: r.AdministrativeUnit,
        administrative_unit_en: r.AdministrativeUnitEn,
      }));
      log(`   Lấy được ${records.length} phường xã từ SQL Server`);
      for (let i = 0; i < records.length; i += BATCH_SIZE) {
        await upsertBatch(Ward, records.slice(i, i + BATCH_SIZE),
          ['name','name_en','full_name','full_name_en','code_name','administrative_unit','administrative_unit_en']);
        log(`   ✅ Upsert ${Math.min(i + BATCH_SIZE, records.length)}/${records.length}`);
      }
      stats.wards = records.length;
      log(`✅ Wards hoàn thành: ${records.length} bản ghi`);
    };

    // Luôn sync bảng cha trước để tránh FK violation
    // districts cần provinces, wards cần districts
    if (target === 'all' || target === 'provinces') {
      await syncProvinces();
    }
    if (target === 'all' || target === 'districts') {
      if (target === 'districts') {
        log('ℹ️  Auto sync Provinces trước để đảm bảo FK...');
        await syncProvinces();
      }
      await syncDistricts();
    }
    if (target === 'all' || target === 'wards') {
      if (target === 'wards') {
        log('ℹ️  Auto sync Provinces + Districts trước để đảm bảo FK...');
        await syncProvinces();
        await syncDistricts();
      }
      await syncWards();
    }

    log('🎉 Sync hoàn tất!');
    done(stats);
    res.end();
  } catch (e) {
    err(e.message);
    res.end();
  }
});

module.exports = router;
