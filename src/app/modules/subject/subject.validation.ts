import { z } from "zod";

export const subjectValidationSchema = z.object({
  name: z.string().min(1, { message: "Subject Name is required" }),

  language: z.string().min(1, { message: "Language is required" }),

  studentId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid student ID" }), // MongoDB ObjectId validation
});
