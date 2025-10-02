"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../Errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../Errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../Errors/handleCastError"));
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
    ///Check Error Type
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        // console.log("Simplified error: ", simplifiedError);
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.node_env === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
        previousError: err,
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
