const sequelize = require('../config/database');
const User = require('./user');
const Province = require('./province');
const District = require('./district');
const Ward = require('./ward');

Province.hasMany(District, { foreignKey: 'province_code', sourceKey: 'code', as: 'districts' });
District.belongsTo(Province, { foreignKey: 'province_code', targetKey: 'code', as: 'province' });

District.hasMany(Ward, { foreignKey: 'district_code', sourceKey: 'code', as: 'wards' });
Ward.belongsTo(District, { foreignKey: 'district_code', targetKey: 'code', as: 'district' });

module.exports = { sequelize, User, Province, District, Ward };
