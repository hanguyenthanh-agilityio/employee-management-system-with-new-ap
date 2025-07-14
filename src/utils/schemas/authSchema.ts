import { z } from 'zod';

const nameField = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `${label} must be at least 2 characters`)
    .max(50, `${label} is too long`)
    .regex(
      /^[a-zA-Z\s'-]+$/,
      `${label} can only contain letters, spaces, apostrophes, and hyphens`,
    );

export const emailField = z
  .string()
  .trim()
  .nonempty({ message: 'Email is required' })
  .max(100, { message: 'Email is too long' })
  .email({
    message: 'Please enter a valid email address',
  });

const passwordField = z.string().min(6).max(100, {
  message: 'Password must be between 6 and 100 characters',
});

// Validate for Login form
export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type LoginInput = z.infer<typeof loginSchema>;

// Validate for Register form
export const registerSchema = z
  .object({
    firstName: nameField('First name'),
    lastName: nameField('Last name'),
    email: emailField,
    phone: z
      .string()
      .min(8, 'Phone must be at least 8 digits')
      .max(11, 'Phone must be at most 11 digits')
      .regex(/^\d+$/, 'Phone must contain only digits'),
    password: passwordField,
    confirmPassword: z.string(),
    newsletter: z.boolean().refine((val) => val === true, {
      message: 'You must agree to receive newsletter',
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to terms and privacy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
