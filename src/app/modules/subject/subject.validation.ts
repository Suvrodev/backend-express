import { z } from "zod";

export const subjectValidationSchemaByZod = z
  .object({
    name: z.string().min(1, { message: "Subject Name is required by Zod" }),

    language: z.string().min(1, { message: "Language is required by Zod" }),

    studentId: z.string().min(1, { message: "Student ID is required by Zod" }),
  })
  .strict();

// Type infer from schema
export type TSubjectInput = z.infer<typeof subjectValidationSchemaByZod>;
