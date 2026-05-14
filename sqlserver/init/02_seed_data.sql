-- Seed dữ liệu mẫu vào SQL Server
-- QUAN TRỌNG: Dùng prefix N'' cho mọi chuỗi Unicode tiếng Việt
IF NOT EXISTS (SELECT 1 FROM Provinces)
BEGIN
    INSERT INTO Provinces VALUES
    (N'01',N'Hà Nội',N'Ha Noi',N'Thành phố Hà Nội',N'Ha Noi City',N'ha_noi',N'Thành phố trực thuộc trung ương',N'Municipality', GETDATE()),
    (N'02',N'Hà Giang',N'Ha Giang',N'Tỉnh Hà Giang',N'Ha Giang Province',N'ha_giang',N'Tỉnh',N'Province', GETDATE()),
    (N'04',N'Cao Bằng',N'Cao Bang',N'Tỉnh Cao Bằng',N'Cao Bang Province',N'cao_bang',N'Tỉnh',N'Province', GETDATE()),
    (N'06',N'Bắc Kạn',N'Bac Kan',N'Tỉnh Bắc Kạn',N'Bac Kan Province',N'bac_kan',N'Tỉnh',N'Province', GETDATE()),
    (N'08',N'Tuyên Quang',N'Tuyen Quang',N'Tỉnh Tuyên Quang',N'Tuyen Quang Province',N'tuyen_quang',N'Tỉnh',N'Province', GETDATE()),
    (N'10',N'Lào Cai',N'Lao Cai',N'Tỉnh Lào Cai',N'Lao Cai Province',N'lao_cai',N'Tỉnh',N'Province', GETDATE()),
    (N'11',N'Điện Biên',N'Dien Bien',N'Tỉnh Điện Biên',N'Dien Bien Province',N'dien_bien',N'Tỉnh',N'Province', GETDATE()),
    (N'12',N'Lai Châu',N'Lai Chau',N'Tỉnh Lai Châu',N'Lai Chau Province',N'lai_chau',N'Tỉnh',N'Province', GETDATE()),
    (N'14',N'Sơn La',N'Son La',N'Tỉnh Sơn La',N'Son La Province',N'son_la',N'Tỉnh',N'Province', GETDATE()),
    (N'15',N'Yên Bái',N'Yen Bai',N'Tỉnh Yên Bái',N'Yen Bai Province',N'yen_bai',N'Tỉnh',N'Province', GETDATE()),
    (N'17',N'Hoà Bình',N'Hoa Binh',N'Tỉnh Hoà Bình',N'Hoa Binh Province',N'hoa_binh',N'Tỉnh',N'Province', GETDATE()),
    (N'19',N'Thái Nguyên',N'Thai Nguyen',N'Tỉnh Thái Nguyên',N'Thai Nguyen Province',N'thai_nguyen',N'Tỉnh',N'Province', GETDATE()),
    (N'20',N'Lạng Sơn',N'Lang Son',N'Tỉnh Lạng Sơn',N'Lang Son Province',N'lang_son',N'Tỉnh',N'Province', GETDATE()),
    (N'22',N'Quảng Ninh',N'Quang Ninh',N'Tỉnh Quảng Ninh',N'Quang Ninh Province',N'quang_ninh',N'Tỉnh',N'Province', GETDATE()),
    (N'24',N'Bắc Giang',N'Bac Giang',N'Tỉnh Bắc Giang',N'Bac Giang Province',N'bac_giang',N'Tỉnh',N'Province', GETDATE()),
    (N'25',N'Phú Thọ',N'Phu Tho',N'Tỉnh Phú Thọ',N'Phu Tho Province',N'phu_tho',N'Tỉnh',N'Province', GETDATE()),
    (N'26',N'Vĩnh Phúc',N'Vinh Phuc',N'Tỉnh Vĩnh Phúc',N'Vinh Phuc Province',N'vinh_phuc',N'Tỉnh',N'Province', GETDATE()),
    (N'27',N'Bắc Ninh',N'Bac Ninh',N'Tỉnh Bắc Ninh',N'Bac Ninh Province',N'bac_ninh',N'Tỉnh',N'Province', GETDATE()),
    (N'30',N'Hải Dương',N'Hai Duong',N'Tỉnh Hải Dương',N'Hai Duong Province',N'hai_duong',N'Tỉnh',N'Province', GETDATE()),
    (N'31',N'Hải Phòng',N'Hai Phong',N'Thành phố Hải Phòng',N'Hai Phong City',N'hai_phong',N'Thành phố trực thuộc trung ương',N'Municipality', GETDATE()),
    (N'33',N'Hưng Yên',N'Hung Yen',N'Tỉnh Hưng Yên',N'Hung Yen Province',N'hung_yen',N'Tỉnh',N'Province', GETDATE()),
    (N'34',N'Thái Bình',N'Thai Binh',N'Tỉnh Thái Bình',N'Thai Binh Province',N'thai_binh',N'Tỉnh',N'Province', GETDATE()),
    (N'35',N'Hà Nam',N'Ha Nam',N'Tỉnh Hà Nam',N'Ha Nam Province',N'ha_nam',N'Tỉnh',N'Province', GETDATE()),
    (N'36',N'Nam Định',N'Nam Dinh',N'Tỉnh Nam Định',N'Nam Dinh Province',N'nam_dinh',N'Tỉnh',N'Province', GETDATE()),
    (N'37',N'Ninh Bình',N'Ninh Binh',N'Tỉnh Ninh Bình',N'Ninh Binh Province',N'ninh_binh',N'Tỉnh',N'Province', GETDATE()),
    (N'38',N'Thanh Hóa',N'Thanh Hoa',N'Tỉnh Thanh Hóa',N'Thanh Hoa Province',N'thanh_hoa',N'Tỉnh',N'Province', GETDATE()),
    (N'40',N'Nghệ An',N'Nghe An',N'Tỉnh Nghệ An',N'Nghe An Province',N'nghe_an',N'Tỉnh',N'Province', GETDATE()),
    (N'42',N'Hà Tĩnh',N'Ha Tinh',N'Tỉnh Hà Tĩnh',N'Ha Tinh Province',N'ha_tinh',N'Tỉnh',N'Province', GETDATE()),
    (N'44',N'Quảng Bình',N'Quang Binh',N'Tỉnh Quảng Bình',N'Quang Binh Province',N'quang_binh',N'Tỉnh',N'Province', GETDATE()),
    (N'45',N'Quảng Trị',N'Quang Tri',N'Tỉnh Quảng Trị',N'Quang Tri Province',N'quang_tri',N'Tỉnh',N'Province', GETDATE()),
    (N'46',N'Thừa Thiên Huế',N'Thua Thien Hue',N'Tỉnh Thừa Thiên Huế',N'Thua Thien Hue Province',N'thua_thien_hue',N'Tỉnh',N'Province', GETDATE()),
    (N'48',N'Đà Nẵng',N'Da Nang',N'Thành phố Đà Nẵng',N'Da Nang City',N'da_nang',N'Thành phố trực thuộc trung ương',N'Municipality', GETDATE()),
    (N'49',N'Quảng Nam',N'Quang Nam',N'Tỉnh Quảng Nam',N'Quang Nam Province',N'quang_nam',N'Tỉnh',N'Province', GETDATE()),
    (N'51',N'Quảng Ngãi',N'Quang Ngai',N'Tỉnh Quảng Ngãi',N'Quang Ngai Province',N'quang_ngai',N'Tỉnh',N'Province', GETDATE()),
    (N'52',N'Bình Định',N'Binh Dinh',N'Tỉnh Bình Định',N'Binh Dinh Province',N'binh_dinh',N'Tỉnh',N'Province', GETDATE()),
    (N'54',N'Phú Yên',N'Phu Yen',N'Tỉnh Phú Yên',N'Phu Yen Province',N'phu_yen',N'Tỉnh',N'Province', GETDATE()),
    (N'56',N'Khánh Hòa',N'Khanh Hoa',N'Tỉnh Khánh Hòa',N'Khanh Hoa Province',N'khanh_hoa',N'Tỉnh',N'Province', GETDATE()),
    (N'58',N'Ninh Thuận',N'Ninh Thuan',N'Tỉnh Ninh Thuận',N'Ninh Thuan Province',N'ninh_thuan',N'Tỉnh',N'Province', GETDATE()),
    (N'60',N'Bình Thuận',N'Binh Thuan',N'Tỉnh Bình Thuận',N'Binh Thuan Province',N'binh_thuan',N'Tỉnh',N'Province', GETDATE()),
    (N'62',N'Kon Tum',N'Kon Tum',N'Tỉnh Kon Tum',N'Kon Tum Province',N'kon_tum',N'Tỉnh',N'Province', GETDATE()),
    (N'64',N'Gia Lai',N'Gia Lai',N'Tỉnh Gia Lai',N'Gia Lai Province',N'gia_lai',N'Tỉnh',N'Province', GETDATE()),
    (N'66',N'Đắk Lắk',N'Dak Lak',N'Tỉnh Đắk Lắk',N'Dak Lak Province',N'dak_lak',N'Tỉnh',N'Province', GETDATE()),
    (N'67',N'Đắk Nông',N'Dak Nong',N'Tỉnh Đắk Nông',N'Dak Nong Province',N'dak_nong',N'Tỉnh',N'Province', GETDATE()),
    (N'68',N'Lâm Đồng',N'Lam Dong',N'Tỉnh Lâm Đồng',N'Lam Dong Province',N'lam_dong',N'Tỉnh',N'Province', GETDATE()),
    (N'70',N'Bình Phước',N'Binh Phuoc',N'Tỉnh Bình Phước',N'Binh Phuoc Province',N'binh_phuoc',N'Tỉnh',N'Province', GETDATE()),
    (N'72',N'Tây Ninh',N'Tay Ninh',N'Tỉnh Tây Ninh',N'Tay Ninh Province',N'tay_ninh',N'Tỉnh',N'Province', GETDATE()),
    (N'74',N'Bình Dương',N'Binh Duong',N'Tỉnh Bình Dương',N'Binh Duong Province',N'binh_duong',N'Tỉnh',N'Province', GETDATE()),
    (N'75',N'Đồng Nai',N'Dong Nai',N'Tỉnh Đồng Nai',N'Dong Nai Province',N'dong_nai',N'Tỉnh',N'Province', GETDATE()),
    (N'77',N'Bà Rịa - Vũng Tàu',N'Ba Ria - Vung Tau',N'Tỉnh Bà Rịa - Vũng Tàu',N'Ba Ria - Vung Tau Province',N'ba_ria_vung_tau',N'Tỉnh',N'Province', GETDATE()),
    (N'79',N'Hồ Chí Minh',N'Ho Chi Minh',N'Thành phố Hồ Chí Minh',N'Ho Chi Minh City',N'ho_chi_minh',N'Thành phố trực thuộc trung ương',N'Municipality', GETDATE()),
    (N'80',N'Long An',N'Long An',N'Tỉnh Long An',N'Long An Province',N'long_an',N'Tỉnh',N'Province', GETDATE()),
    (N'82',N'Tiền Giang',N'Tien Giang',N'Tỉnh Tiền Giang',N'Tien Giang Province',N'tien_giang',N'Tỉnh',N'Province', GETDATE()),
    (N'83',N'Bến Tre',N'Ben Tre',N'Tỉnh Bến Tre',N'Ben Tre Province',N'ben_tre',N'Tỉnh',N'Province', GETDATE()),
    (N'84',N'Trà Vinh',N'Tra Vinh',N'Tỉnh Trà Vinh',N'Tra Vinh Province',N'tra_vinh',N'Tỉnh',N'Province', GETDATE()),
    (N'86',N'Vĩnh Long',N'Vinh Long',N'Tỉnh Vĩnh Long',N'Vinh Long Province',N'vinh_long',N'Tỉnh',N'Province', GETDATE()),
    (N'87',N'Đồng Tháp',N'Dong Thap',N'Tỉnh Đồng Tháp',N'Dong Thap Province',N'dong_thap',N'Tỉnh',N'Province', GETDATE()),
    (N'89',N'An Giang',N'An Giang',N'Tỉnh An Giang',N'An Giang Province',N'an_giang',N'Tỉnh',N'Province', GETDATE()),
    (N'91',N'Kiên Giang',N'Kien Giang',N'Tỉnh Kiên Giang',N'Kien Giang Province',N'kien_giang',N'Tỉnh',N'Province', GETDATE()),
    (N'92',N'Cần Thơ',N'Can Tho',N'Thành phố Cần Thơ',N'Can Tho City',N'can_tho',N'Thành phố trực thuộc trung ương',N'Municipality', GETDATE()),
    (N'93',N'Hậu Giang',N'Hau Giang',N'Tỉnh Hậu Giang',N'Hau Giang Province',N'hau_giang',N'Tỉnh',N'Province', GETDATE()),
    (N'94',N'Sóc Trăng',N'Soc Trang',N'Tỉnh Sóc Trăng',N'Soc Trang Province',N'soc_trang',N'Tỉnh',N'Province', GETDATE()),
    (N'95',N'Bạc Liêu',N'Bac Lieu',N'Tỉnh Bạc Liêu',N'Bac Lieu Province',N'bac_lieu',N'Tỉnh',N'Province', GETDATE()),
    (N'96',N'Cà Mau',N'Ca Mau',N'Tỉnh Cà Mau',N'Ca Mau Province',N'ca_mau',N'Tỉnh',N'Province', GETDATE());
    PRINT N'Seeded 63 provinces';
END
GO

IF NOT EXISTS (SELECT 1 FROM Districts)
BEGIN
    INSERT INTO Districts VALUES
    (N'001',N'Ba Đình',N'Ba Dinh',N'Quận Ba Đình',N'Ba Dinh District',N'ba_dinh',N'01',N'Quận',N'District', GETDATE()),
    (N'002',N'Hoàn Kiếm',N'Hoan Kiem',N'Quận Hoàn Kiếm',N'Hoan Kiem District',N'hoan_kiem',N'01',N'Quận',N'District', GETDATE()),
    (N'003',N'Tây Hồ',N'Tay Ho',N'Quận Tây Hồ',N'Tay Ho District',N'tay_ho',N'01',N'Quận',N'District', GETDATE()),
    (N'004',N'Long Biên',N'Long Bien',N'Quận Long Biên',N'Long Bien District',N'long_bien',N'01',N'Quận',N'District', GETDATE()),
    (N'005',N'Cầu Giấy',N'Cau Giay',N'Quận Cầu Giấy',N'Cau Giay District',N'cau_giay',N'01',N'Quận',N'District', GETDATE()),
    (N'006',N'Đống Đa',N'Dong Da',N'Quận Đống Đa',N'Dong Da District',N'dong_da',N'01',N'Quận',N'District', GETDATE()),
    (N'007',N'Hai Bà Trưng',N'Hai Ba Trung',N'Quận Hai Bà Trưng',N'Hai Ba Trung District',N'hai_ba_trung',N'01',N'Quận',N'District', GETDATE()),
    (N'008',N'Hoàng Mai',N'Hoang Mai',N'Quận Hoàng Mai',N'Hoang Mai District',N'hoang_mai',N'01',N'Quận',N'District', GETDATE()),
    (N'009',N'Thanh Xuân',N'Thanh Xuan',N'Quận Thanh Xuân',N'Thanh Xuan District',N'thanh_xuan',N'01',N'Quận',N'District', GETDATE()),
    (N'010',N'Sóc Sơn',N'Soc Son',N'Huyện Sóc Sơn',N'Soc Son District',N'soc_son',N'01',N'Huyện',N'District', GETDATE()),
    (N'768',N'Quận 1',N'District 1',N'Quận 1',N'District 1',N'quan_1',N'79',N'Quận',N'District', GETDATE()),
    (N'769',N'Quận 3',N'District 3',N'Quận 3',N'District 3',N'quan_3',N'79',N'Quận',N'District', GETDATE()),
    (N'770',N'Quận 4',N'District 4',N'Quận 4',N'District 4',N'quan_4',N'79',N'Quận',N'District', GETDATE()),
    (N'771',N'Quận 5',N'District 5',N'Quận 5',N'District 5',N'quan_5',N'79',N'Quận',N'District', GETDATE()),
    (N'772',N'Quận 6',N'District 6',N'Quận 6',N'District 6',N'quan_6',N'79',N'Quận',N'District', GETDATE());
    PRINT N'Seeded 15 districts';
END
GO

IF NOT EXISTS (SELECT 1 FROM Wards)
BEGIN
    INSERT INTO Wards VALUES
    (N'00001',N'Phúc Xá',N'Phuc Xa',N'Phường Phúc Xá',N'Phuc Xa Ward',N'phuc_xa',N'001',N'Phường',N'Ward', GETDATE()),
    (N'00004',N'Trúc Bạch',N'Truc Bach',N'Phường Trúc Bạch',N'Truc Bach Ward',N'truc_bach',N'001',N'Phường',N'Ward', GETDATE()),
    (N'00006',N'Vĩnh Phúc',N'Vinh Phuc',N'Phường Vĩnh Phúc',N'Vinh Phuc Ward',N'vinh_phuc_ward',N'001',N'Phường',N'Ward', GETDATE()),
    (N'00007',N'Cống Vị',N'Cong Vi',N'Phường Cống Vị',N'Cong Vi Ward',N'cong_vi',N'001',N'Phường',N'Ward', GETDATE()),
    (N'00008',N'Liễu Giai',N'Lieu Giai',N'Phường Liễu Giai',N'Lieu Giai Ward',N'lieu_giai',N'001',N'Phường',N'Ward', GETDATE()),
    (N'00010',N'Nguyễn Trung Trực',N'Nguyen Trung Truc',N'Phường Nguyễn Trung Trực',N'Nguyen Trung Truc Ward',N'nguyen_trung_truc',N'001',N'Phường',N'Ward', GETDATE()),
    (N'00013',N'Điện Biên',N'Dien Bien',N'Phường Điện Biên',N'Dien Bien Ward',N'dien_bien_ward',N'001',N'Phường',N'Ward', GETDATE()),
    (N'00016',N'Đội Cấn',N'Doi Can',N'Phường Đội Cấn',N'Doi Can Ward',N'doi_can',N'001',N'Phường',N'Ward', GETDATE()),
    (N'00019',N'Ngọc Hà',N'Ngoc Ha',N'Phường Ngọc Hà',N'Ngoc Ha Ward',N'ngoc_ha',N'001',N'Phường',N'Ward', GETDATE()),
    (N'00022',N'Kim Mã',N'Kim Ma',N'Phường Kim Mã',N'Kim Ma Ward',N'kim_ma',N'001',N'Phường',N'Ward', GETDATE()),
    (N'00028',N'Lý Tự Trọng',N'Ly Tu Trong',N'Phường Lý Tự Trọng',N'Ly Tu Trong Ward',N'ly_tu_trong',N'768',N'Phường',N'Ward', GETDATE()),
    (N'00031',N'Bến Nghé',N'Ben Nghe',N'Phường Bến Nghé',N'Ben Nghe Ward',N'ben_nghe',N'768',N'Phường',N'Ward', GETDATE()),
    (N'00034',N'Bến Thành',N'Ben Thanh',N'Phường Bến Thành',N'Ben Thanh Ward',N'ben_thanh',N'768',N'Phường',N'Ward', GETDATE()),
    (N'00037',N'Nguyễn Thái Bình',N'Nguyen Thai Binh',N'Phường Nguyễn Thái Bình',N'Nguyen Thai Binh Ward',N'nguyen_thai_binh',N'768',N'Phường',N'Ward', GETDATE()),
    (N'00040',N'Phạm Ngũ Lão',N'Pham Ngu Lao',N'Phường Phạm Ngũ Lão',N'Pham Ngu Lao Ward',N'pham_ngu_lao',N'768',N'Phường',N'Ward', GETDATE());
    PRINT N'Seeded 15 wards';
END
GO

PRINT N'✅ SQL Server seed completed';
GO
