"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectValidationSchemaByZod = void 0;
const zod_1 = require("zod");
exports.subjectValidationSchemaByZod = zod_1.z
    .object({
    name: zod_1.z.string().min(1, { message: "Subject Name is required by Zod" }),
    language: zod_1.z.string().min(1, { message: "Language is required by Zod" }),
    studentId: zod_1.z.string().min(1, { message: "Student ID is required by Zod" }),
})
    .strict();
