"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentCreateSchema = exports.BloodGroupEnum = exports.SexEnum = void 0;
const zod_1 = require("zod");
exports.SexEnum = zod_1.z.enum(["male", "female"]);
exports.BloodGroupEnum = zod_1.z.enum([
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
]);
exports.studentCreateSchema = zod_1.z
    .object({
    id: zod_1.z
        .number()
        .int()
        .nonnegative()
        .refine((v) => v !== undefined, { message: "Student ID is required" }),
    name: zod_1.z.string().min(1, { message: "Student name is required" }),
    image: zod_1.z.string().url({ message: "Image must be a valid URL" }),
    email: zod_1.z.string().email({ message: "Please fill a valid email address" }),
    dob: zod_1.z
        .string()
        .refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "DOB must be a valid date",
    }),
    sex: exports.SexEnum,
    age: zod_1.z.number().int().min(0).max(150),
    bloodGroup: exports.BloodGroupEnum,
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    isDelete: zod_1.z.boolean().optional(),
    isBlocked: zod_1.z.boolean().optional(),
})
    .strict();
