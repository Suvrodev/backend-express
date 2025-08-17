import { z } from "zod";

export const SexEnum = z
  .enum(["male", "female"])
  .refine((v) => v === "male" || v === "female", {
    message: "Sex must be either 'male' or 'female by Zod'",
  });

export const BloodGroupEnum = z
  .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
  .refine(
    (v) => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(v),
    {
      message: "Blood group must be a valid type by Zod",
    }
  );

export const studentValidationSchemaByZod = z
  .object({
    id: z
      .number()
      .int()
      .nonnegative()
      .refine((v) => v !== undefined, {
        message: "Student ID is required by Zod",
      }),

    name: z.string().min(1, { message: "Student name is required by Zod" }),

    image: z.string().url({ message: "Image must be a valid URL by Zod" }),

    email: z
      .string()
      .email({ message: "Please fill a valid email address by Zod" }),

    dob: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
      message: "DOB must be a valid date by Zod",
    }),

    sex: SexEnum,

    age: z
      .number()
      .int()
      .min(0, { message: "Age must be at least 0 by Zod" })
      .max(150, { message: "Age must be at most 150 by Zod" }),

    bloodGroup: BloodGroupEnum,

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters by Zod" }),

    isDelete: z.boolean().optional().default(false),

    isBlocked: z.boolean().optional().default(false),
  })
  .strict();
