"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    //setting default values
    let statusCode = err.statusCode || http_status_1.status.INTERNAL_SERVER_ERROR;
    let message = err.message || "Something went wrong";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong from error souces",
        },
    ];
    //Check zod error or not
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = "Fuck Fucku fuck fuck by zod";
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: err,
    });
};
exports.default = globalErrorHandler;
/**
 * Pattern:
 * success
 * message
 * errorSources:[
 *  path:
 *  message:
 * ]
 * stack
 */
