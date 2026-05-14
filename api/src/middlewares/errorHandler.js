const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);
  return errorResponse(res, 500, 'InternalError', 'Lỗi hệ thống, vui lòng thử lại sau');
};

const notFound = (req, res) => {
  return errorResponse(res, 404, 'NotFound', `Không tìm thấy route: ${req.method} ${req.path}`);
};

module.exports = { errorHandler, notFound };
