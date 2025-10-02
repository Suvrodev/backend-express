"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errorSources = Object.values(err.errors).map((val) => {
        return {
            path: val.path,
            message: val.message,
        };
    });
    const statusCode = 400;
    const heyError = "Tomake ki send kote parbo?";
    return {
        statusCode,
        // message: "Zod Validation error", because ami kon library use korchi bolbo na
        message: "Validation error",
        errorSources,
    };
};
exports.default = handleValidationError;
