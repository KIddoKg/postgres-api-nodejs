const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const District = sequelize.define('District', {
  code: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  name_en: {
    type: DataTypes.STRING(100),
  },
  full_name: {
    type: DataTypes.STRING(150),
  },
  full_name_en: {
    type: DataTypes.STRING(150),
  },
  code_name: {
    type: DataTypes.STRING(100),
  },
  province_code: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  administrative_unit: {
    type: DataTypes.STRING(50),
  },
  administrative_unit_en: {
    type: DataTypes.STRING(50),
  },
}, {
  tableName: 'districts',
  timestamps: false,
});

module.exports = District;
