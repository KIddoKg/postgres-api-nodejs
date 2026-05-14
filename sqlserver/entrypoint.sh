#!/bin/bash
# Khởi động SQL Server và tự động chạy init scripts

/opt/mssql/bin/sqlservr &
SQL_PID=$!

echo "⏳ Đợi SQL Server sẵn sàng..."
for i in $(seq 1 30); do
  /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -Q "SELECT 1" -C -b > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "✅ SQL Server ready"
    break
  fi
  echo "  Waiting... ($i/30)"
  sleep 2
done

# Chạy init scripts nếu chưa có DB
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -C \
  -Q "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name='VnProvincesLegacy') PRINT 'NEED_INIT'" \
  | grep -q "NEED_INIT"

if [ $? -eq 0 ]; then
  echo "🔄 Chạy init scripts..."
  /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -C -i /init/01_create_db.sql
  /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -C -d VnProvincesLegacy -i /init/02_seed_data.sql
  echo "✅ Init completed"
else
  echo "⏭  DB đã tồn tại, bỏ qua init"
fi

wait $SQL_PID
