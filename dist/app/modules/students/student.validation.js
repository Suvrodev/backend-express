"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidationSchemaByZod = exports.BloodGroupEnum = exports.SexEnum = void 0;
const zod_1 = require("zod");
exports.SexEnum = zod_1.z
    .enum(["male", "female"])
    .refine((v) => v === "male" || v === "female", {
    message: "Sex must be either 'male' or 'female by Zod'",
});
exports.BloodGroupEnum = zod_1.z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .refine((v) => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(v), {
    message: "Blood group must be a valid type by Zod",
});
exports.studentValidationSchemaByZod = zod_1.z
    .object({
    id: zod_1.z
        .number()
        .int()
        .nonnegative()
        .refine((v) => v !== undefined, {
        message: "Student ID is required by Zod",
    }),
    name: zod_1.z.string().min(1, { message: "Student name is required by Zod" }),
    taka: zod_1.z.number().min(1, { message: "Taka is required by Zod" }),
    image: zod_1.z.string().url({ message: "Image must be a valid URL by Zod" }),
    email: zod_1.z
        .string()
        .email({ message: "Please fill a valid email address by Zod" }),
    dob: zod_1.z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "DOB must be a valid date by Zod",
    }),
    sex: exports.SexEnum,
    age: zod_1.z
        .number()
        .int()
        .min(0, { message: "Age must be at least 0 by Zod" })
        .max(150, { message: "Age must be at most 150 by Zod" }),
    bloodGroup: exports.BloodGroupEnum,
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters by Zod" }),
    isDelete: zod_1.z.boolean().optional().default(false),
    isBlocked: zod_1.z.boolean().optional().default(false),
})
    .strict();
