-- Seed dữ liệu mẫu vào SQL Server (mô phỏng hệ thống legacy)
-- Chỉ insert nếu chưa có dữ liệu
IF NOT EXISTS (SELECT 1 FROM Provinces)
BEGIN
    INSERT INTO Provinces VALUES
    ('01','Hà Nội','Ha Noi','Thành phố Hà Nội','Ha Noi City','ha_noi','Thành phố trực thuộc trung ương','Municipality', GETDATE()),
    ('02','Hà Giang','Ha Giang','Tỉnh Hà Giang','Ha Giang Province','ha_giang','Tỉnh','Province', GETDATE()),
    ('04','Cao Bằng','Cao Bang','Tỉnh Cao Bằng','Cao Bang Province','cao_bang','Tỉnh','Province', GETDATE()),
    ('06','Bắc Kạn','Bac Kan','Tỉnh Bắc Kạn','Bac Kan Province','bac_kan','Tỉnh','Province', GETDATE()),
    ('08','Tuyên Quang','Tuyen Quang','Tỉnh Tuyên Quang','Tuyen Quang Province','tuyen_quang','Tỉnh','Province', GETDATE()),
    ('10','Lào Cai','Lao Cai','Tỉnh Lào Cai','Lao Cai Province','lao_cai','Tỉnh','Province', GETDATE()),
    ('11','Điện Biên','Dien Bien','Tỉnh Điện Biên','Dien Bien Province','dien_bien','Tỉnh','Province', GETDATE()),
    ('12','Lai Châu','Lai Chau','Tỉnh Lai Châu','Lai Chau Province','lai_chau','Tỉnh','Province', GETDATE()),
    ('14','Sơn La','Son La','Tỉnh Sơn La','Son La Province','son_la','Tỉnh','Province', GETDATE()),
    ('15','Yên Bái','Yen Bai','Tỉnh Yên Bái','Yen Bai Province','yen_bai','Tỉnh','Province', GETDATE()),
    ('17','Hoà Bình','Hoa Binh','Tỉnh Hoà Bình','Hoa Binh Province','hoa_binh','Tỉnh','Province', GETDATE()),
    ('19','Thái Nguyên','Thai Nguyen','Tỉnh Thái Nguyên','Thai Nguyen Province','thai_nguyen','Tỉnh','Province', GETDATE()),
    ('20','Lạng Sơn','Lang Son','Tỉnh Lạng Sơn','Lang Son Province','lang_son','Tỉnh','Province', GETDATE()),
    ('22','Quảng Ninh','Quang Ninh','Tỉnh Quảng Ninh','Quang Ninh Province','quang_ninh','Tỉnh','Province', GETDATE()),
    ('24','Bắc Giang','Bac Giang','Tỉnh Bắc Giang','Bac Giang Province','bac_giang','Tỉnh','Province', GETDATE()),
    ('25','Phú Thọ','Phu Tho','Tỉnh Phú Thọ','Phu Tho Province','phu_tho','Tỉnh','Province', GETDATE()),
    ('26','Vĩnh Phúc','Vinh Phuc','Tỉnh Vĩnh Phúc','Vinh Phuc Province','vinh_phuc','Tỉnh','Province', GETDATE()),
    ('27','Bắc Ninh','Bac Ninh','Tỉnh Bắc Ninh','Bac Ninh Province','bac_ninh','Tỉnh','Province', GETDATE()),
    ('30','Hải Dương','Hai Duong','Tỉnh Hải Dương','Hai Duong Province','hai_duong','Tỉnh','Province', GETDATE()),
    ('31','Hải Phòng','Hai Phong','Thành phố Hải Phòng','Hai Phong City','hai_phong','Thành phố trực thuộc trung ương','Municipality', GETDATE()),
    ('33','Hưng Yên','Hung Yen','Tỉnh Hưng Yên','Hung Yen Province','hung_yen','Tỉnh','Province', GETDATE()),
    ('34','Thái Bình','Thai Binh','Tỉnh Thái Bình','Thai Binh Province','thai_binh','Tỉnh','Province', GETDATE()),
    ('35','Hà Nam','Ha Nam','Tỉnh Hà Nam','Ha Nam Province','ha_nam','Tỉnh','Province', GETDATE()),
    ('36','Nam Định','Nam Dinh','Tỉnh Nam Định','Nam Dinh Province','nam_dinh','Tỉnh','Province', GETDATE()),
    ('37','Ninh Bình','Ninh Binh','Tỉnh Ninh Bình','Ninh Binh Province','ninh_binh','Tỉnh','Province', GETDATE()),
    ('38','Thanh Hóa','Thanh Hoa','Tỉnh Thanh Hóa','Thanh Hoa Province','thanh_hoa','Tỉnh','Province', GETDATE()),
    ('40','Nghệ An','Nghe An','Tỉnh Nghệ An','Nghe An Province','nghe_an','Tỉnh','Province', GETDATE()),
    ('42','Hà Tĩnh','Ha Tinh','Tỉnh Hà Tĩnh','Ha Tinh Province','ha_tinh','Tỉnh','Province', GETDATE()),
    ('44','Quảng Bình','Quang Binh','Tỉnh Quảng Bình','Quang Binh Province','quang_binh','Tỉnh','Province', GETDATE()),
    ('45','Quảng Trị','Quang Tri','Tỉnh Quảng Trị','Quang Tri Province','quang_tri','Tỉnh','Province', GETDATE()),
    ('46','Thừa Thiên Huế','Thua Thien Hue','Tỉnh Thừa Thiên Huế','Thua Thien Hue Province','thua_thien_hue','Tỉnh','Province', GETDATE()),
    ('48','Đà Nẵng','Da Nang','Thành phố Đà Nẵng','Da Nang City','da_nang','Thành phố trực thuộc trung ương','Municipality', GETDATE()),
    ('49','Quảng Nam','Quang Nam','Tỉnh Quảng Nam','Quang Nam Province','quang_nam','Tỉnh','Province', GETDATE()),
    ('51','Quảng Ngãi','Quang Ngai','Tỉnh Quảng Ngãi','Quang Ngai Province','quang_ngai','Tỉnh','Province', GETDATE()),
    ('52','Bình Định','Binh Dinh','Tỉnh Bình Định','Binh Dinh Province','binh_dinh','Tỉnh','Province', GETDATE()),
    ('54','Phú Yên','Phu Yen','Tỉnh Phú Yên','Phu Yen Province','phu_yen','Tỉnh','Province', GETDATE()),
    ('56','Khánh Hòa','Khanh Hoa','Tỉnh Khánh Hòa','Khanh Hoa Province','khanh_hoa','Tỉnh','Province', GETDATE()),
    ('58','Ninh Thuận','Ninh Thuan','Tỉnh Ninh Thuận','Ninh Thuan Province','ninh_thuan','Tỉnh','Province', GETDATE()),
    ('60','Bình Thuận','Binh Thuan','Tỉnh Bình Thuận','Binh Thuan Province','binh_thuan','Tỉnh','Province', GETDATE()),
    ('62','Kon Tum','Kon Tum','Tỉnh Kon Tum','Kon Tum Province','kon_tum','Tỉnh','Province', GETDATE()),
    ('64','Gia Lai','Gia Lai','Tỉnh Gia Lai','Gia Lai Province','gia_lai','Tỉnh','Province', GETDATE()),
    ('66','Đắk Lắk','Dak Lak','Tỉnh Đắk Lắk','Dak Lak Province','dak_lak','Tỉnh','Province', GETDATE()),
    ('67','Đắk Nông','Dak Nong','Tỉnh Đắk Nông','Dak Nong Province','dak_nong','Tỉnh','Province', GETDATE()),
    ('68','Lâm Đồng','Lam Dong','Tỉnh Lâm Đồng','Lam Dong Province','lam_dong','Tỉnh','Province', GETDATE()),
    ('70','Bình Phước','Binh Phuoc','Tỉnh Bình Phước','Binh Phuoc Province','binh_phuoc','Tỉnh','Province', GETDATE()),
    ('72','Tây Ninh','Tay Ninh','Tỉnh Tây Ninh','Tay Ninh Province','tay_ninh','Tỉnh','Province', GETDATE()),
    ('74','Bình Dương','Binh Duong','Tỉnh Bình Dương','Binh Duong Province','binh_duong','Tỉnh','Province', GETDATE()),
    ('75','Đồng Nai','Dong Nai','Tỉnh Đồng Nai','Dong Nai Province','dong_nai','Tỉnh','Province', GETDATE()),
    ('77','Bà Rịa - Vũng Tàu','Ba Ria - Vung Tau','Tỉnh Bà Rịa - Vũng Tàu','Ba Ria - Vung Tau Province','ba_ria_vung_tau','Tỉnh','Province', GETDATE()),
    ('79','Hồ Chí Minh','Ho Chi Minh','Thành phố Hồ Chí Minh','Ho Chi Minh City','ho_chi_minh','Thành phố trực thuộc trung ương','Municipality', GETDATE()),
    ('80','Long An','Long An','Tỉnh Long An','Long An Province','long_an','Tỉnh','Province', GETDATE()),
    ('82','Tiền Giang','Tien Giang','Tỉnh Tiền Giang','Tien Giang Province','tien_giang','Tỉnh','Province', GETDATE()),
    ('83','Bến Tre','Ben Tre','Tỉnh Bến Tre','Ben Tre Province','ben_tre','Tỉnh','Province', GETDATE()),
    ('84','Trà Vinh','Tra Vinh','Tỉnh Trà Vinh','Tra Vinh Province','tra_vinh','Tỉnh','Province', GETDATE()),
    ('86','Vĩnh Long','Vinh Long','Tỉnh Vĩnh Long','Vinh Long Province','vinh_long','Tỉnh','Province', GETDATE()),
    ('87','Đồng Tháp','Dong Thap','Tỉnh Đồng Tháp','Dong Thap Province','dong_thap','Tỉnh','Province', GETDATE()),
    ('89','An Giang','An Giang','Tỉnh An Giang','An Giang Province','an_giang','Tỉnh','Province', GETDATE()),
    ('91','Kiên Giang','Kien Giang','Tỉnh Kiên Giang','Kien Giang Province','kien_giang','Tỉnh','Province', GETDATE()),
    ('92','Cần Thơ','Can Tho','Thành phố Cần Thơ','Can Tho City','can_tho','Thành phố trực thuộc trung ương','Municipality', GETDATE()),
    ('93','Hậu Giang','Hau Giang','Tỉnh Hậu Giang','Hau Giang Province','hau_giang','Tỉnh','Province', GETDATE()),
    ('94','Sóc Trăng','Soc Trang','Tỉnh Sóc Trăng','Soc Trang Province','soc_trang','Tỉnh','Province', GETDATE()),
    ('95','Bạc Liêu','Bac Lieu','Tỉnh Bạc Liêu','Bac Lieu Province','bac_lieu','Tỉnh','Province', GETDATE()),
    ('96','Cà Mau','Ca Mau','Tỉnh Cà Mau','Ca Mau Province','ca_mau','Tỉnh','Province', GETDATE());

    PRINT 'Seeded 63 provinces';
END
GO

IF NOT EXISTS (SELECT 1 FROM Districts)
BEGIN
    INSERT INTO Districts VALUES
    ('001','Ba Đình','Ba Dinh','Quận Ba Đình','Ba Dinh District','ba_dinh','01','Quận','District', GETDATE()),
    ('002','Hoàn Kiếm','Hoan Kiem','Quận Hoàn Kiếm','Hoan Kiem District','hoan_kiem','01','Quận','District', GETDATE()),
    ('003','Tây Hồ','Tay Ho','Quận Tây Hồ','Tay Ho District','tay_ho','01','Quận','District', GETDATE()),
    ('004','Long Biên','Long Bien','Quận Long Biên','Long Bien District','long_bien','01','Quận','District', GETDATE()),
    ('005','Cầu Giấy','Cau Giay','Quận Cầu Giấy','Cau Giay District','cau_giay','01','Quận','District', GETDATE()),
    ('006','Đống Đa','Dong Da','Quận Đống Đa','Dong Da District','dong_da','01','Quận','District', GETDATE()),
    ('007','Hai Bà Trưng','Hai Ba Trung','Quận Hai Bà Trưng','Hai Ba Trung District','hai_ba_trung','01','Quận','District', GETDATE()),
    ('008','Hoàng Mai','Hoang Mai','Quận Hoàng Mai','Hoang Mai District','hoang_mai','01','Quận','District', GETDATE()),
    ('009','Thanh Xuân','Thanh Xuan','Quận Thanh Xuân','Thanh Xuan District','thanh_xuan','01','Quận','District', GETDATE()),
    ('010','Sóc Sơn','Soc Son','Huyện Sóc Sơn','Soc Son District','soc_son','01','Huyện','District', GETDATE()),
    ('768','Quận 1','District 1','Quận 1','District 1','quan_1','79','Quận','District', GETDATE()),
    ('769','Quận 3','District 3','Quận 3','District 3','quan_3','79','Quận','District', GETDATE()),
    ('770','Quận 4','District 4','Quận 4','District 4','quan_4','79','Quận','District', GETDATE()),
    ('771','Quận 5','District 5','Quận 5','District 5','quan_5','79','Quận','District', GETDATE()),
    ('772','Quận 6','District 6','Quận 6','District 6','quan_6','79','Quận','District', GETDATE());

    PRINT 'Seeded 15 districts';
END
GO

IF NOT EXISTS (SELECT 1 FROM Wards)
BEGIN
    INSERT INTO Wards VALUES
    ('00001','Phúc Xá','Phuc Xa','Phường Phúc Xá','Phuc Xa Ward','phuc_xa','001','Phường','Ward', GETDATE()),
    ('00004','Trúc Bạch','Truc Bach','Phường Trúc Bạch','Truc Bach Ward','truc_bach','001','Phường','Ward', GETDATE()),
    ('00006','Vĩnh Phúc','Vinh Phuc','Phường Vĩnh Phúc','Vinh Phuc Ward','vinh_phuc_ward','001','Phường','Ward', GETDATE()),
    ('00007','Cống Vị','Cong Vi','Phường Cống Vị','Cong Vi Ward','cong_vi','001','Phường','Ward', GETDATE()),
    ('00008','Liễu Giai','Lieu Giai','Phường Liễu Giai','Lieu Giai Ward','lieu_giai','001','Phường','Ward', GETDATE()),
    ('00010','Nguyễn Trung Trực','Nguyen Trung Truc','Phường Nguyễn Trung Trực','Nguyen Trung Truc Ward','nguyen_trung_truc','001','Phường','Ward', GETDATE()),
    ('00013','Điện Biên','Dien Bien','Phường Điện Biên','Dien Bien Ward','dien_bien_ward','001','Phường','Ward', GETDATE()),
    ('00016','Đội Cấn','Doi Can','Phường Đội Cấn','Doi Can Ward','doi_can','001','Phường','Ward', GETDATE()),
    ('00019','Ngọc Hà','Ngoc Ha','Phường Ngọc Hà','Ngoc Ha Ward','ngoc_ha','001','Phường','Ward', GETDATE()),
    ('00022','Kim Mã','Kim Ma','Phường Kim Mã','Kim Ma Ward','kim_ma','001','Phường','Ward', GETDATE()),
    ('00028','Lý Tự Trọng','Ly Tu Trong','Phường Lý Tự Trọng','Ly Tu Trong Ward','ly_tu_trong','768','Phường','Ward', GETDATE()),
    ('00031','Bến Nghé','Ben Nghe','Phường Bến Nghé','Ben Nghe Ward','ben_nghe','768','Phường','Ward', GETDATE()),
    ('00034','Bến Thành','Ben Thanh','Phường Bến Thành','Ben Thanh Ward','ben_thanh','768','Phường','Ward', GETDATE()),
    ('00037','Nguyễn Thái Bình','Nguyen Thai Binh','Phường Nguyễn Thái Bình','Nguyen Thai Binh Ward','nguyen_thai_binh','768','Phường','Ward', GETDATE()),
    ('00040','Phạm Ngũ Lão','Pham Ngu Lao','Phường Phạm Ngũ Lão','Pham Ngu Lao Ward','pham_ngu_lao','768','Phường','Ward', GETDATE());

    PRINT 'Seeded 15 wards';
END
GO

PRINT '✅ SQL Server seed completed';
GO
