"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
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
    /**
     * Make Handler
     */
    const handleZodError = (err) => {
        const errorSources = err.issues.map((issue) => {
            return {
                path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
                message: issue.message,
            };
        });
        statusCode = 400;
        return {
            statusCode,
            // message: "Zod Validation error", because ami kon library use korchi bolbo na
            message: "Validation error",
            errorSources,
        };
    };
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        // console.log("Simplified error: ", simplifiedError);
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
