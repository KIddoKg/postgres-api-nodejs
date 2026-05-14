const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Province = sequelize.define('Province', {
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
  administrative_unit: {
    type: DataTypes.STRING(50),
  },
  administrative_unit_en: {
    type: DataTypes.STRING(50),
  },
}, {
  tableName: 'provinces',
  timestamps: false,
});

module.exports = Province;
