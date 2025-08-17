import { z } from "zod";

export const SexEnum = z.enum(["male", "female"]);
export const BloodGroupEnum = z.enum([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);

export const studentCreateSchema = z
  .object({
    id: z
      .number()
      .int()
      .nonnegative()
      .refine((v) => v !== undefined, { message: "Student ID is required" }),
    name: z.string().min(1, { message: "Student name is required" }),
    image: z.string().url({ message: "Image must be a valid URL" }),
    email: z.string().email({ message: "Please fill a valid email address" }),
    dob: z
      .string()
      .refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "DOB must be a valid date",
      }),
    sex: SexEnum,
    age: z.number().int().min(0).max(150),
    bloodGroup: BloodGroupEnum,
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    isDelete: z.boolean().optional(),
    isBlocked: z.boolean().optional(),
  })
  .strict();
