const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { paginatedResponse, successResponse, errorResponse } = require('../utils/response');

const getUsers = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 20));
  const offset = (page - 1) * size;

  const { count, rows } = await User.findAndCountAll({
    attributes: { exclude: ['password'] },
    limit: size,
    offset,
    order: [['created_at', 'DESC']],
  });
  return paginatedResponse(res, rows, { total: count, page, size });
};

const createUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  if (!email || !password || !name) {
    return errorResponse(res, 400, 'ValidationError', 'Email, mật khẩu và tên là bắt buộc');
  }

  const exists = await User.findOne({ where: { email } });
  if (exists) return errorResponse(res, 409, 'Conflict', 'Email đã được sử dụng');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, name, role: role || 'viewer' });

  return successResponse(res, {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    created_at: user.created_at,
  });
};

const updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return errorResponse(res, 404, 'NotFound', 'Không tìm thấy người dùng');

  const { name, role, is_active, password } = req.body;
  if (name) user.name = name;
  if (role) user.role = role;
  if (typeof is_active === 'boolean') user.is_active = is_active;
  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();
  return successResponse(res, {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
  });
};

const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return errorResponse(res, 404, 'NotFound', 'Không tìm thấy người dùng');
  if (user.id === req.user.id) return errorResponse(res, 400, 'BadRequest', 'Không thể xóa chính mình');

  await user.destroy();
  return successResponse(res, { message: 'Xóa người dùng thành công' });
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
