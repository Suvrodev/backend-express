"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.loginValidationSchema = void 0;
const zod_1 = require("zod");
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .trim()
            .min(1, { message: "Email is required" })
            .email({ message: "Invalid email address" }),
        password: zod_1.z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .max(128, { message: "Password is too long" }),
        // .refine((p) => /[A-Za-z]/.test(p), {
        //   message: "Password must contain at least one letter",
        // })
        // .refine((p) => /[0-9]/.test(p), {
        //   message: "Password must contain at least one number",
        // }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        _backEnd_refresh: zod_1.z.string({
            required_error: "Refresh Token is required",
        }),
    }),
});
exports.AuthValidation = {
    loginValidationSchema: exports.loginValidationSchema,
    refreshTokenValidationSchema,
};
