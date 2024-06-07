"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const DataBaseException_1 = require("../../exceptions/DataBaseException");
const HttpExceptions_1 = require("../../exceptions/HttpExceptions");
function GlobalExceptionFilter(err, req, res, next) {
    console.log("This is Global Error Filter: ", err);
    const defaultStatusCode = 500;
    const defaultMessage = "Internal Server Error";
    const statusCode = err instanceof HttpExceptions_1.HttpException ? err.statusCode : defaultStatusCode;
    const message = err instanceof HttpExceptions_1.HttpException
        ? err.message
        : err instanceof DataBaseException_1.DatabaseException
            ? err.message
            : defaultMessage;
    const response = {
        date: new Date(),
        path: req.url,
        statusCode,
        message,
    };
    res.status(statusCode).send(response);
}
exports.GlobalExceptionFilter = GlobalExceptionFilter;
