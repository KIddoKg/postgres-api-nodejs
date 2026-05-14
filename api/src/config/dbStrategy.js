/**
 * DB Strategy — kiểm soát nguồn dữ liệu theo DB_MODE
 *
 * DB_MODE=postgres   → chỉ dùng PostgreSQL
 * DB_MODE=sqlserver  → chỉ dùng SQL Server
 * DB_MODE=dual       → thử Postgres trước, fallback SQL Server nếu không có dữ liệu
 */

const DB_MODE = process.env.DB_MODE || 'postgres';

const isPostgresEnabled  = () => DB_MODE === 'postgres' || DB_MODE === 'dual';
const isSqlServerEnabled = () => DB_MODE === 'sqlserver' || DB_MODE === 'dual';
const isDual             = () => DB_MODE === 'dual';

/**
 * Chạy query theo strategy:
 * @param {Function} pgFn      - async function dùng Sequelize/Postgres
 * @param {Function} mssqlFn   - async function dùng mssql
 * @returns kết quả từ DB được chọn
 */
const query = async (pgFn, mssqlFn) => {
  if (DB_MODE === 'postgres') {
    return pgFn();
  }

  if (DB_MODE === 'sqlserver') {
    return mssqlFn();
  }

  // dual mode: thử Postgres trước
  if (DB_MODE === 'dual') {
    try {
      const result = await pgFn();
      // Nếu Postgres trả về dữ liệu thì dùng luôn
      const isEmpty = result === null
        || result === undefined
        || (Array.isArray(result?.rows) && result.rows.length === 0)
        || (result?.count === 0);

      if (!isEmpty) return result;

      console.log('[DB Strategy] Postgres empty → fallback SQL Server');
      return mssqlFn();
    } catch (err) {
      console.warn('[DB Strategy] Postgres error → fallback SQL Server:', err.message);
      return mssqlFn();
    }
  }

  throw new Error(`DB_MODE không hợp lệ: ${DB_MODE}`);
};

module.exports = { query, isPostgresEnabled, isSqlServerEnabled, isDual, DB_MODE };
