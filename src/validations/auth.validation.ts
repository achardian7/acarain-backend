import z from 'zod';

export const registerValidateSchema = z
  .object({
    fullName: z.string(),
    username: z.string(),
    email: z.email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Password doesn't match",
    path: ['confirmPassword'],
  });

export const loginValidateSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
