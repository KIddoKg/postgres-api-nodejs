const { v4: uuidv4 } = require('uuid');

const generateTraceId = () => {
  return BigInt('0x' + uuidv4().replace(/-/g, '')).toString().slice(0, 19);
};

const successResponse = (res, data, meta = {}) => {
  const traceId = generateTraceId();
  return res.json({
    meta: {
      traceId,
      success: true,
      ...meta,
    },
    data,
  });
};

const paginatedResponse = (res, data, { total, page, size }) => {
  const pageCount = Math.ceil(total / size);
  const traceId = generateTraceId();
  return res.json({
    meta: {
      traceId,
      success: true,
      total,
      page,
      size,
      pageCount,
      canNext: page < pageCount,
      canPre: page > 1,
    },
    data,
  });
};

const errorResponse = (res, statusCode, code, message) => {
  const traceId = generateTraceId();
  return res.status(statusCode).json({
    meta: {
      traceId,
      success: false,
    },
    error: {
      code,
      message,
    },
  });
};

module.exports = { successResponse, paginatedResponse, errorResponse };
