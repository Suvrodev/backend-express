"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectValidationSchema = void 0;
const zod_1 = require("zod");
exports.subjectValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Subject Name is required" }),
    language: zod_1.z.string().min(1, { message: "Language is required" }),
    studentId: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid student ID" }), // MongoDB ObjectId validation
});
