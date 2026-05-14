# VN Provinces Admin

Hệ thống quản lý dữ liệu tỉnh thành Việt Nam gồm REST API + Web Admin, chạy hoàn toàn bằng Docker.

## Công nghệ sử dụng

| Layer | Công nghệ |
|---|---|
| Backend API | Node.js 20 + Express.js |
| Database | PostgreSQL 16 |
| ORM | Sequelize |
| Authentication | JWT (JSON Web Token) + bcrypt |
| Frontend | Vue 3 + Vite + Element Plus |
| State management | Pinia |
| Reverse proxy | Nginx |
| Container | Docker + Docker Compose |

---

## Cấu trúc thư mục

```
docker-api-postgre/
├── docker-compose.yml          # Orchestration toàn bộ services
├── .env                        # Biến môi trường (tạo từ .env.example)
├── .env.example                # Mẫu biến môi trường
│
├── api/                        # Node.js Backend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── index.js            # Entry point, khởi động Express server
│       ├── config/
│       │   └── database.js     # Kết nối PostgreSQL qua Sequelize
│       ├── models/             # Sequelize models: User, Province, District, Ward
│       ├── controllers/        # Logic xử lý request
│       ├── routes/             # Định nghĩa routes
│       ├── middlewares/
│       │   ├── auth.js         # JWT middleware
│       │   └── errorHandler.js
│       ├── migrations/
│       │   └── run.js          # Tạo bảng trong DB (sequelize.sync)
│       ├── seeders/
│       │   ├── provinces.data.js  # Dữ liệu 63 tỉnh thành
│       │   └── run.js             # Seed DB lần đầu
│       └── utils/
│           └── response.js     # Helper format response chuẩn
│
├── web/                        # Vue 3 Frontend
│   ├── Dockerfile
│   ├── vite.config.js
│   └── src/
│       ├── main.js
│       ├── App.vue
│       ├── api/                # Axios wrappers gọi API
│       ├── store/              # Pinia stores (auth)
│       ├── router/             # Vue Router + route guards
│       ├── layouts/            # AppLayout (sidebar + header)
│       └── views/              # Các trang: Login, Provinces, Districts, Wards, Users
│
└── nginx/
    └── nginx.conf              # Proxy /api → api:3000, / → web:5173
```

---

## Yêu cầu hệ thống

- [Docker](https://docs.docker.com/get-docker/) >= 24.x
- [Docker Compose](https://docs.docker.com/compose/) >= 2.x

> Không cần cài Node.js hay PostgreSQL trên máy host.

---

## Cài đặt & Chạy lần đầu

### 1. Cấu hình biến môi trường

```bash
cp .env.example .env
```

Chỉnh sửa `.env` nếu cần (mặc định đã dùng được):

```env
POSTGRES_DB=vn_provinces
POSTGRES_USER=admin
POSTGRES_PASSWORD=secret123

JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123
```

> **Lưu ý:** Thay `JWT_SECRET` bằng chuỗi ngẫu nhiên đủ dài trước khi deploy production.

### 2. Build và khởi động

```bash
docker compose up --build
```

Lần đầu chạy Docker sẽ tự động:
1. Pull images `node:20-alpine`, `postgres:16-alpine`, `nginx:alpine`
2. Build image cho `api` và `web`
3. Khởi động PostgreSQL, chờ healthy
4. Chạy migrations (tạo bảng)
5. Seed dữ liệu 63 tỉnh thành + tài khoản admin
6. Khởi động web và nginx

### 3. Truy cập

| Địa chỉ | Mô tả |
|---|---|
| http://localhost | Web Admin |
| http://localhost/api/health | Health check API |

### 4. Đăng nhập mặc định

| Trường | Giá trị |
|---|---|
| Email | `admin@example.com` |
| Mật khẩu | `Admin@123` |

---

## Các lệnh thường dùng

### Khởi động / Dừng

```bash
# Khởi động (chạy nền)
docker compose up -d

# Khởi động với rebuild image
docker compose up --build -d

# Dừng toàn bộ
docker compose down

# Dừng và xóa cả dữ liệu DB (reset hoàn toàn)
docker compose down -v
```

### Xem logs

```bash
# Tất cả services
docker compose logs -f

# Chỉ xem log API
docker compose logs -f api

# Chỉ xem log Web
docker compose logs -f web

# Chỉ xem log DB
docker compose logs -f db
```

### Truy cập shell container

```bash
# Vào shell API container
docker compose exec api sh

# Vào psql PostgreSQL
docker compose exec db psql -U admin -d vn_provinces
```

### Chạy lại migration / seeder thủ công

```bash
# Chỉ migrate (tạo/cập nhật bảng)
docker compose exec api npm run migrate

# Chỉ seed (nhập dữ liệu mẫu)
docker compose exec api npm run seed

# Migrate + seed cùng lúc
docker compose exec api npm run setup
```

### Rebuild một service cụ thể

```bash
# Rebuild API sau khi thay đổi package.json
docker compose up --build api -d

# Rebuild Web sau khi thay đổi package.json
docker compose up --build web -d
```

---

## Migration SQL Server → PostgreSQL

### Kiến trúc dual-database

```
DB_MODE=sqlserver  →  chỉ đọc SQL Server (trước khi migrate)
DB_MODE=dual       →  đọc Postgres trước, fallback SQL Server (đang migrate)
DB_MODE=postgres   →  chỉ đọc PostgreSQL (hoàn tất migrate)
```

### Các bước thực hiện

**Bước 1 — Cấu hình kết nối SQL Server** trong file `.env`:
```env
MSSQL_HOST=your-sqlserver-host
MSSQL_PORT=1433
MSSQL_DB=your_database_name
MSSQL_USER=sa
MSSQL_PASSWORD=your_password
MSSQL_ENCRYPT=false
MSSQL_TRUST_CERT=true

DB_MODE=dual
```

**Bước 2 — Chỉnh mapping tên bảng/cột** trong file:
`api/src/migrations/syncFromSqlServer.js` → section `MAPPING`

Sửa `mssqlTable` và `columns` cho khớp với schema SQL Server thực tế của bạn.

**Bước 3 — Rebuild và chạy sync:**
```bash
# Rebuild API để cài mssql package
docker compose up --build api -d

# Sync toàn bộ dữ liệu SQL Server → Postgres
docker compose exec api npm run sync

# Hoặc sync từng bảng riêng
docker compose exec api npm run sync:provinces
docker compose exec api npm run sync:districts
docker compose exec api npm run sync:wards
```

**Bước 4 — Kiểm tra tiến độ:**
```bash
# Qua API (cần token admin)
GET /api/migration/status

# Hoặc xem trực tiếp DB
docker compose exec db psql -U admin -d vn_provinces -c "SELECT COUNT(*) FROM provinces;"
```

**Bước 5 — Chuyển hẳn sang Postgres** khi dữ liệu đã đủ:
```env
# Sửa trong .env
DB_MODE=postgres
```
```bash
docker compose up -d api
```

**Bước 6 — Xóa cấu hình SQL Server** (tuỳ chọn) sau khi xác nhận hệ thống ổn định:
- Xoá các biến `MSSQL_*` trong `.env`
- Xoá package `mssql` khỏi `package.json`

### Lưu ý mapping bảng

File `api/src/migrations/syncFromSqlServer.js` có section `MAPPING` cần sửa cho đúng với schema SQL Server của bạn:

```js
const MAPPING = {
  provinces: {
    mssqlTable: 'Provinces',     // ← tên bảng SQL Server
    columns: {
      code: 'ProvinceCode',      // ← postgres_col: 'SqlServerColumn'
      name: 'ProvinceName',
      // ...
    },
  },
  // ...
};
```

---

## API Reference

Tất cả response đều theo chuẩn:

**Thành công:**
```json
{
  "meta": {
    "traceId": "1778723819817063666",
    "success": true,
    "total": 63,
    "page": 1,
    "size": 20,
    "pageCount": 4,
    "canNext": true,
    "canPre": false
  },
  "data": [...]
}
```

**Lỗi:**
```json
{
  "meta": {
    "traceId": "1778723819817063665",
    "success": false
  },
  "error": {
    "code": "NotAuthenticated",
    "message": "Bạn chưa đăng nhập"
  }
}
```

### Auth

| Method | Endpoint | Auth | Mô tả |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Đăng nhập |
| GET | `/api/auth/me` | JWT | Thông tin user hiện tại |
| POST | `/api/auth/logout` | JWT | Đăng xuất |

**Đăng nhập:**
```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@123"}'
```

### Tỉnh thành (yêu cầu JWT)

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/provinces` | Danh sách tỉnh thành |
| GET | `/api/provinces/:code` | Chi tiết tỉnh + quận huyện |
| GET | `/api/provinces/:code/districts` | Danh sách quận huyện |
| GET | `/api/provinces/:code/districts/:dc` | Chi tiết quận + phường xã |
| GET | `/api/provinces/:code/districts/:dc/wards` | Danh sách phường xã |

**Query parameters hỗ trợ:**

| Param | Mô tả | Ví dụ |
|---|---|---|
| `page` | Số trang (mặc định: 1) | `?page=2` |
| `size` | Số bản ghi/trang (mặc định: 20, tối đa: 200) | `?size=50` |
| `q` | Tìm kiếm theo tên | `?q=hà nội` |
| `administrative_unit` | Lọc loại đơn vị | `?administrative_unit=Tỉnh` |

```bash
# Lấy danh sách tỉnh thành (cần token)
curl http://localhost/api/provinces \
  -H "Authorization: Bearer <token>"

# Tìm kiếm
curl "http://localhost/api/provinces?q=hà&size=10" \
  -H "Authorization: Bearer <token>"
```

### Quản lý người dùng (yêu cầu JWT + role Admin)

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/users` | Danh sách người dùng |
| POST | `/api/users` | Tạo người dùng mới |
| PUT | `/api/users/:id` | Cập nhật người dùng |
| DELETE | `/api/users/:id` | Xóa người dùng |

---

## Tính năng Web Admin

| Trang | Đường dẫn | Quyền |
|---|---|---|
| Đăng nhập | `/login` | Public |
| Dashboard | `/dashboard` | Đăng nhập |
| Danh sách tỉnh thành | `/provinces` | Đăng nhập |
| Danh sách quận huyện | `/provinces/:code/districts` | Đăng nhập |
| Danh sách phường xã | `/provinces/:code/districts/:dc/wards` | Đăng nhập |
| Quản lý người dùng | `/users` | Admin |

---

## Phân quyền

| Role | Xem dữ liệu | Quản lý Users |
|---|---|---|
| `viewer` | ✅ | ❌ |
| `admin` | ✅ | ✅ |

---

## Dữ liệu mẫu

- **63 tỉnh/thành phố** đầy đủ (5 thành phố trực thuộc TW, 58 tỉnh)
- **5 quận** mẫu thuộc Hà Nội (Ba Đình, Hoàn Kiếm, Tây Hồ, Long Biên, Cầu Giấy)
- **5 phường** mẫu thuộc quận Ba Đình
- **1 tài khoản admin** mặc định

---

## Xử lý sự cố thường gặp

**Container API bị restart liên tục:**
```bash
docker compose logs api
# Thường do DB chưa sẵn sàng — chờ vài giây rồi thử lại
```

**Lỗi port 80 đã được dùng:**
```bash
# Đổi port trong docker-compose.yml
ports:
  - "8080:80"   # truy cập qua http://localhost:8080
```

**Reset toàn bộ dữ liệu:**
```bash
docker compose down -v
docker compose up --build
```

**Xem trạng thái tất cả containers:**
```bash
docker compose ps
```
