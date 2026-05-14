/**
 * Sync dữ liệu từ SQL Server → PostgreSQL
 *
 * Cách dùng:
 *   node src/migrations/syncFromSqlServer.js              # sync tất cả
 *   node src/migrations/syncFromSqlServer.js provinces    # chỉ sync tỉnh
 *   node src/migrations/syncFromSqlServer.js districts    # chỉ sync quận
 *   node src/migrations/syncFromSqlServer.js wards        # chỉ sync phường
 *
 * Hoặc qua npm script:
 *   docker compose exec api npm run sync
 */

require('dotenv').config();
const { getPool, sql } = require('../config/sqlserver');
const { Province, District, Ward, sequelize } = require('../models');

// ─── Cấu hình mapping bảng SQL Server → Postgres ──────────────────────────────
// Sửa tên bảng/cột cho khớp với schema SQL Server thực tế của bạn
const MAPPING = {
  provinces: {
    mssqlTable: 'Provinces',          // tên bảng trong SQL Server
    columns: {
      code:                 'ProvinceCode',
      name:                 'ProvinceName',
      name_en:              'ProvinceNameEn',
      full_name:            'FullName',
      full_name_en:         'FullNameEn',
      code_name:            'CodeName',
      administrative_unit:  'AdministrativeUnit',
      administrative_unit_en: 'AdministrativeUnitEn',
    },
  },
  districts: {
    mssqlTable: 'Districts',
    columns: {
      code:                 'DistrictCode',
      name:                 'DistrictName',
      name_en:              'DistrictNameEn',
      full_name:            'FullName',
      full_name_en:         'FullNameEn',
      code_name:            'CodeName',
      province_code:        'ProvinceCode',
      administrative_unit:  'AdministrativeUnit',
      administrative_unit_en: 'AdministrativeUnitEn',
    },
  },
  wards: {
    mssqlTable: 'Wards',
    columns: {
      code:                 'WardCode',
      name:                 'WardName',
      name_en:              'WardNameEn',
      full_name:            'FullName',
      full_name_en:         'FullNameEn',
      code_name:            'CodeName',
      district_code:        'DistrictCode',
      administrative_unit:  'AdministrativeUnit',
      administrative_unit_en: 'AdministrativeUnitEn',
    },
  },
};

// ─── Helper ────────────────────────────────────────────────────────────────────

const BATCH_SIZE = 500; // số bản ghi insert mỗi lần

const log = (msg) => console.log(`[${new Date().toISOString()}] ${msg}`);

/**
 * Lấy toàn bộ dữ liệu từ SQL Server và map sang cấu trúc Postgres
 */
const fetchFromMssql = async (pool, tableConfig) => {
  const { mssqlTable, columns } = tableConfig;
  const mssqlCols = Object.values(columns).join(', ');
  const result = await pool.request().query(`SELECT ${mssqlCols} FROM ${mssqlTable}`);

  // Map tên cột MSSQL → Postgres
  const reverseMap = Object.fromEntries(
    Object.entries(columns).map(([pgCol, msCol]) => [msCol, pgCol])
  );

  return result.recordset.map((row) => {
    const mapped = {};
    for (const [msCol, val] of Object.entries(row)) {
      const pgCol = reverseMap[msCol];
      if (pgCol) mapped[pgCol] = val;
    }
    return mapped;
  });
};

/**
 * Upsert batch vào Postgres (insert hoặc update nếu đã tồn tại)
 */
const upsertBatch = async (Model, records) => {
  await Model.bulkCreate(records, {
    updateOnDuplicate: Object.keys(MAPPING.provinces.columns).filter(k => k !== 'code'),
  });
};

// ─── Sync functions ────────────────────────────────────────────────────────────

const syncProvinces = async (pool) => {
  log('🔄 Đang sync Provinces...');
  const records = await fetchFromMssql(pool, MAPPING.provinces);
  log(`   Lấy được ${records.length} tỉnh thành từ SQL Server`);

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    await upsertBatch(Province, batch);
    log(`   ✅ Upsert ${Math.min(i + BATCH_SIZE, records.length)}/${records.length}`);
  }
  log(`✅ Provinces done: ${records.length} bản ghi`);
  return records.length;
};

const syncDistricts = async (pool) => {
  log('🔄 Đang sync Districts...');
  const records = await fetchFromMssql(pool, MAPPING.districts);
  log(`   Lấy được ${records.length} quận huyện từ SQL Server`);

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    await upsertBatch(District, batch);
    log(`   ✅ Upsert ${Math.min(i + BATCH_SIZE, records.length)}/${records.length}`);
  }
  log(`✅ Districts done: ${records.length} bản ghi`);
  return records.length;
};

const syncWards = async (pool) => {
  log('🔄 Đang sync Wards...');
  const records = await fetchFromMssql(pool, MAPPING.wards);
  log(`   Lấy được ${records.length} phường xã từ SQL Server`);

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    await upsertBatch(Ward, batch);
    log(`   ✅ Upsert ${Math.min(i + BATCH_SIZE, records.length)}/${records.length}`);
  }
  log(`✅ Wards done: ${records.length} bản ghi`);
  return records.length;
};

// ─── Main ──────────────────────────────────────────────────────────────────────

const main = async () => {
  const target = process.argv[2]; // provinces | districts | wards | undefined = all
  let pool;

  try {
    log('🔌 Kết nối SQL Server...');
    pool = await getPool();

    log('🔌 Kết nối PostgreSQL...');
    await sequelize.authenticate();

    const stats = {};

    if (!target || target === 'provinces') {
      stats.provinces = await syncProvinces(pool);
    }
    if (!target || target === 'districts') {
      stats.districts = await syncDistricts(pool);
    }
    if (!target || target === 'wards') {
      stats.wards = await syncWards(pool);
    }

    log('');
    log('═══════════════════════════════');
    log('🎉 Sync hoàn thành!');
    for (const [table, count] of Object.entries(stats)) {
      log(`   ${table}: ${count} bản ghi`);
    }
    log('═══════════════════════════════');
    log('💡 Sau khi xác nhận dữ liệu đúng, đổi DB_MODE=postgres trong .env');

    process.exit(0);
  } catch (err) {
    console.error('❌ Sync thất bại:', err.message);
    console.error(err);
    process.exit(1);
  }
};

main();
