const express = require('express');
const router = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/auth');
const { Province, District, Ward } = require('../models');
const { getPool } = require('../config/sqlserver');
const { DB_MODE } = require('../config/dbStrategy');
const { successResponse, errorResponse } = require('../utils/response');

// GET /api/migration/status — xem trạng thái migrate (chỉ admin)
router.get('/status', authenticate, requireAdmin, async (req, res) => {
  try {
    const pgStats = {
      provinces: await Province.count(),
      districts: await District.count(),
      wards:     await Ward.count(),
    };

    let mssqlStats = null;
    let mssqlConnected = false;

    if (DB_MODE === 'dual' || DB_MODE === 'sqlserver') {
      try {
        const pool = await getPool();
        const [p, d, w] = await Promise.all([
          pool.request().query('SELECT COUNT(*) AS total FROM Provinces'),
          pool.request().query('SELECT COUNT(*) AS total FROM Districts'),
          pool.request().query('SELECT COUNT(*) AS total FROM Wards'),
        ]);
        mssqlStats = {
          provinces: p.recordset[0].total,
          districts: d.recordset[0].total,
          wards:     w.recordset[0].total,
        };
        mssqlConnected = true;
      } catch (err) {
        mssqlStats = { error: err.message };
      }
    }

    const calcProgress = (pg, ms) => {
      if (!ms || ms === 0) return 100;
      return Math.min(100, Math.round((pg / ms) * 100));
    };

    return successResponse(res, {
      db_mode: DB_MODE,
      postgres: {
        connected: true,
        ...pgStats,
      },
      sqlserver: {
        connected: mssqlConnected,
        ...mssqlStats,
      },
      migration_progress: mssqlConnected ? {
        provinces: `${calcProgress(pgStats.provinces, mssqlStats.provinces)}%`,
        districts: `${calcProgress(pgStats.districts, mssqlStats.districts)}%`,
        wards:     `${calcProgress(pgStats.wards, mssqlStats.wards)}%`,
      } : null,
      next_step: DB_MODE === 'dual'
        ? 'Chạy "npm run sync" để đồng bộ dữ liệu. Khi đủ, đổi DB_MODE=postgres'
        : DB_MODE === 'postgres'
          ? '✅ Đang dùng PostgreSQL hoàn toàn'
          : 'Đang dùng SQL Server. Đổi DB_MODE=dual để bắt đầu migrate',
    });
  } catch (err) {
    return errorResponse(res, 500, 'InternalError', err.message);
  }
});

module.exports = router;
