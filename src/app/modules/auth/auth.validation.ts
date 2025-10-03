import { z } from "zod";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
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

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    _backEnd_refresh: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
};
