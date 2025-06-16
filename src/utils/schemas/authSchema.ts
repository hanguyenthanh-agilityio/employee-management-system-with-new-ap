import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(5, { message: 'Email is required' })
    .max(100, { message: 'Email is too long' })
    .email({
      message: 'Please enter a valid email address',
    }),
  password: z.string().min(6).max(100, {
    message: 'Password must be between 6 and 100 characters',
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name is too long')
      .regex(
        /^[a-zA-Z\s'-]+$/,
        'First name can only contain letters, spaces, apostrophes, and hyphens',
      ),
    lastName: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name is too long')
      .regex(
        /^[a-zA-Z\s'-]+$/,
        'First name can only contain letters, spaces, apostrophes, and hyphens',
      ),
    email: z.string().email('Invalid email'),
    phone: z
      .string()
      .min(8, 'Phone must be at least 8 digits')
      .max(11, 'Phone must be at most 11 digits')
      .regex(/^\d+$/, 'Phone must contain only digits'),
    password: z.string().min(6, 'Password must be 6+ chars'),
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
