const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { errorResponse } = require('../utils/response');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, 401, 'NotAuthenticated', 'Bạn chưa đăng nhập');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user || !user.is_active) {
      return errorResponse(res, 401, 'NotAuthenticated', 'Phiên đăng nhập không hợp lệ');
    }
    req.user = user;
    next();
  } catch (err) {
    return errorResponse(res, 401, 'NotAuthenticated', 'Token không hợp lệ hoặc đã hết hạn');
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return errorResponse(res, 403, 'Forbidden', 'Bạn không có quyền thực hiện thao tác này');
  }
  next();
};

module.exports = { authenticate, requireAdmin };
