require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User, Province, District, Ward } = require('../models');
const provincesData = require('./provinces.data');

async function runSeeders() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Seed provinces
    const existingCount = await Province.count();
    if (existingCount === 0) {
      await Province.bulkCreate(provincesData, { ignoreDuplicates: true });
      console.log(`✅ Seeded ${provincesData.length} provinces`);

      // Seed sample districts for Hà Nội
      await District.bulkCreate([
        { code: '001', name: 'Ba Đình', name_en: 'Ba Dinh', full_name: 'Quận Ba Đình', full_name_en: 'Ba Dinh District', code_name: 'ba_dinh', province_code: '01', administrative_unit: 'Quận', administrative_unit_en: 'District' },
        { code: '002', name: 'Hoàn Kiếm', name_en: 'Hoan Kiem', full_name: 'Quận Hoàn Kiếm', full_name_en: 'Hoan Kiem District', code_name: 'hoan_kiem', province_code: '01', administrative_unit: 'Quận', administrative_unit_en: 'District' },
        { code: '003', name: 'Tây Hồ', name_en: 'Tay Ho', full_name: 'Quận Tây Hồ', full_name_en: 'Tay Ho District', code_name: 'tay_ho', province_code: '01', administrative_unit: 'Quận', administrative_unit_en: 'District' },
        { code: '004', name: 'Long Biên', name_en: 'Long Bien', full_name: 'Quận Long Biên', full_name_en: 'Long Bien District', code_name: 'long_bien', province_code: '01', administrative_unit: 'Quận', administrative_unit_en: 'District' },
        { code: '005', name: 'Cầu Giấy', name_en: 'Cau Giay', full_name: 'Quận Cầu Giấy', full_name_en: 'Cau Giay District', code_name: 'cau_giay', province_code: '01', administrative_unit: 'Quận', administrative_unit_en: 'District' },
      ], { ignoreDuplicates: true });
      console.log('✅ Seeded sample districts for Ha Noi');

      // Seed sample wards for Ba Đình
      await Ward.bulkCreate([
        { code: '00001', name: 'Phúc Xá', name_en: 'Phuc Xa', full_name: 'Phường Phúc Xá', full_name_en: 'Phuc Xa Ward', code_name: 'phuc_xa', district_code: '001', administrative_unit: 'Phường', administrative_unit_en: 'Ward' },
        { code: '00004', name: 'Trúc Bạch', name_en: 'Truc Bach', full_name: 'Phường Trúc Bạch', full_name_en: 'Truc Bach Ward', code_name: 'truc_bach', district_code: '001', administrative_unit: 'Phường', administrative_unit_en: 'Ward' },
        { code: '00006', name: 'Vĩnh Phúc', name_en: 'Vinh Phuc', full_name: 'Phường Vĩnh Phúc', full_name_en: 'Vinh Phuc Ward', code_name: 'vinh_phuc', district_code: '001', administrative_unit: 'Phường', administrative_unit_en: 'Ward' },
        { code: '00007', name: 'Cống Vị', name_en: 'Cong Vi', full_name: 'Phường Cống Vị', full_name_en: 'Cong Vi Ward', code_name: 'cong_vi', district_code: '001', administrative_unit: 'Phường', administrative_unit_en: 'Ward' },
        { code: '00008', name: 'Liễu Giai', name_en: 'Lieu Giai', full_name: 'Phường Liễu Giai', full_name_en: 'Lieu Giai Ward', code_name: 'lieu_giai', district_code: '001', administrative_unit: 'Phường', administrative_unit_en: 'Ward' },
      ], { ignoreDuplicates: true });
      console.log('✅ Seeded sample wards for Ba Dinh');
    } else {
      console.log('⏭  Provinces already seeded, skipping');
    }

    // Seed admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin',
        is_active: true,
      });
      console.log(`✅ Seeded admin user: ${adminEmail}`);
    } else {
      console.log('⏭  Admin user already exists, skipping');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder failed:', err.message);
    process.exit(1);
  }
}

runSeeders();
