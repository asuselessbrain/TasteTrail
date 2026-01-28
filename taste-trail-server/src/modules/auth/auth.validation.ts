import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required"),
  }),
});


// auth.validation.ts
const userValidationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  profilePhoto: z.string().url("Profile photo must be a valid URL"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});



export const AuthValidation = {
  loginValidationSchema,
  userValidationSchema
};
