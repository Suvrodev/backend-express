"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const globalErrorHandler = (err, req, res, next) => {
  const statusCode = http_status_1.status.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};
exports.default = globalErrorHandler;
