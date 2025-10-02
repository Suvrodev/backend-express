"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    // Mongo duplicate error theke field & value ber kora
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const value = Object.values(err.keyValue || {})[0] || "value";
    const errorSources = [
        {
            path: field,
            message: `${field}: ${value} already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Duplicate key error",
        errorSources,
    };
};
exports.default = handleDuplicateError;
