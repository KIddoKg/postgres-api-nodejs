const { Op } = require('sequelize');
const { Province, District, Ward } = require('../models');
const { paginatedResponse, successResponse, errorResponse } = require('../utils/response');

const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const size = Math.min(200, Math.max(1, parseInt(query.size) || 20));
  const offset = (page - 1) * size;
  return { page, size, offset };
};

const getProvinces = async (req, res) => {
  const { page, size, offset } = getPagination(req.query);
  const where = {};
  if (req.query.q) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${req.query.q}%` } },
      { full_name: { [Op.iLike]: `%${req.query.q}%` } },
      { code_name: { [Op.iLike]: `%${req.query.q}%` } },
    ];
  }
  if (req.query.administrative_unit) {
    where.administrative_unit = req.query.administrative_unit;
  }

  const { count, rows } = await Province.findAndCountAll({ where, limit: size, offset, order: [['code', 'ASC']] });
  return paginatedResponse(res, rows, { total: count, page, size });
};

const getProvince = async (req, res) => {
  const province = await Province.findByPk(req.params.code, {
    include: [{ association: 'districts', order: [['code', 'ASC']] }],
  });
  if (!province) return errorResponse(res, 404, 'NotFound', 'Không tìm thấy tỉnh/thành phố');
  return successResponse(res, province);
};

const getDistricts = async (req, res) => {
  const { page, size, offset } = getPagination(req.query);
  const where = { province_code: req.params.code };
  if (req.query.q) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${req.query.q}%` } },
      { full_name: { [Op.iLike]: `%${req.query.q}%` } },
    ];
  }

  const province = await Province.findByPk(req.params.code);
  if (!province) return errorResponse(res, 404, 'NotFound', 'Không tìm thấy tỉnh/thành phố');

  const { count, rows } = await District.findAndCountAll({ where, limit: size, offset, order: [['code', 'ASC']] });
  return paginatedResponse(res, rows, { total: count, page, size });
};

const getDistrict = async (req, res) => {
  const district = await District.findByPk(req.params.districtCode, {
    include: [{ association: 'wards', order: [['code', 'ASC']] }],
  });
  if (!district) return errorResponse(res, 404, 'NotFound', 'Không tìm thấy quận/huyện');
  return successResponse(res, district);
};

const getWards = async (req, res) => {
  const { page, size, offset } = getPagination(req.query);
  const where = { district_code: req.params.districtCode };
  if (req.query.q) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${req.query.q}%` } },
      { full_name: { [Op.iLike]: `%${req.query.q}%` } },
    ];
  }

  const district = await District.findByPk(req.params.districtCode);
  if (!district) return errorResponse(res, 404, 'NotFound', 'Không tìm thấy quận/huyện');

  const { count, rows } = await Ward.findAndCountAll({ where, limit: size, offset, order: [['code', 'ASC']] });
  return paginatedResponse(res, rows, { total: count, page, size });
};

module.exports = { getProvinces, getProvince, getDistricts, getDistrict, getWards };
