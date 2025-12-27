import { z } from "zod";

export const LoginValidation = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters.")
      .max(50, "Password must be at most 50 characters."),
  })
  .strict();

export const RegisterValidation = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters.")
      .max(50, "Username must be at most 50 characters."),
    email: z.string().email(),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters.")
      .max(50, "Password must be at most 50 characters."),
    confirmPassword: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters.")
      .max(50, "Password must be at most 50 characters."),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password is not match",
        path: ["comfirmPassword"],
      });
    }
  });
