const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { successResponse, errorResponse } = require('../utils/response');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, 'ValidationError', 'Email và mật khẩu là bắt buộc');
  }

  const user = await User.findOne({ where: { email } });
  if (!user || !user.is_active) {
    return errorResponse(res, 401, 'NotAuthenticated', 'Email hoặc mật khẩu không đúng');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return errorResponse(res, 401, 'NotAuthenticated', 'Email hoặc mật khẩu không đúng');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return successResponse(res, {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};

const me = async (req, res) => {
  return successResponse(res, {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
};

const logout = (req, res) => {
  return successResponse(res, { message: 'Đăng xuất thành công' });
};

module.exports = { login, me, logout };
