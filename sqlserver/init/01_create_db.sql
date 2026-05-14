-- Tạo database mẫu mô phỏng hệ thống legacy SQL Server
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'VnProvincesLegacy')
BEGIN
    CREATE DATABASE VnProvincesLegacy;
    PRINT 'Database VnProvincesLegacy created';
END
GO

USE VnProvincesLegacy;
GO

-- Bảng Provinces (tên cột theo kiểu SQL Server legacy)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Provinces')
BEGIN
    CREATE TABLE Provinces (
        ProvinceCode        NVARCHAR(10)  PRIMARY KEY,
        ProvinceName        NVARCHAR(100) NOT NULL,
        ProvinceNameEn      NVARCHAR(100),
        FullName            NVARCHAR(150),
        FullNameEn          NVARCHAR(150),
        CodeName            NVARCHAR(100),
        AdministrativeUnit  NVARCHAR(50),
        AdministrativeUnitEn NVARCHAR(50),
        CreatedAt           DATETIME DEFAULT GETDATE()
    );
    PRINT 'Table Provinces created';
END
GO

-- Bảng Districts
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Districts')
BEGIN
    CREATE TABLE Districts (
        DistrictCode        NVARCHAR(10)  PRIMARY KEY,
        DistrictName        NVARCHAR(100) NOT NULL,
        DistrictNameEn      NVARCHAR(100),
        FullName            NVARCHAR(150),
        FullNameEn          NVARCHAR(150),
        CodeName            NVARCHAR(100),
        ProvinceCode        NVARCHAR(10)  NOT NULL,
        AdministrativeUnit  NVARCHAR(50),
        AdministrativeUnitEn NVARCHAR(50),
        CreatedAt           DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (ProvinceCode) REFERENCES Provinces(ProvinceCode)
    );
    PRINT 'Table Districts created';
END
GO

-- Bảng Wards
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Wards')
BEGIN
    CREATE TABLE Wards (
        WardCode            NVARCHAR(10)  PRIMARY KEY,
        WardName            NVARCHAR(100) NOT NULL,
        WardNameEn          NVARCHAR(100),
        FullName            NVARCHAR(150),
        FullNameEn          NVARCHAR(150),
        CodeName            NVARCHAR(100),
        DistrictCode        NVARCHAR(10)  NOT NULL,
        AdministrativeUnit  NVARCHAR(50),
        AdministrativeUnitEn NVARCHAR(50),
        CreatedAt           DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (DistrictCode) REFERENCES Districts(DistrictCode)
    );
    PRINT 'Table Wards created';
END
GO
