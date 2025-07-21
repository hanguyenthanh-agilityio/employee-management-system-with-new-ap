import { z } from 'zod';
import { emailField } from './authSchema';

export const personalDetails = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be at most 50 characters')
    .trim()
    .regex(/^[a-zA-Z\s]+$/, 'Username must only contain letters and spaces'),
  department: z
    .string()
    .min(2, 'Department must be at least 2 characters')
    .max(100),
  jobTitle: z
    .string()
    .min(2, 'JobTitle must be at least 2 characters')
    .max(100),
  jobCategory: z
    .string()
    .min(2, 'Job Category must be at least 2 characters')
    .max(100),
  documentId: z.string().optional(),
  avatar: z
    .union([z.string(), z.instanceof(File)])
    .optional()
    .nullable(),
});

export type PersonalDetailsInput = z.infer<typeof personalDetails>;

export const contactDetails = z.object({
  mainPhoneNumber: z
    .string()
    .min(9, 'Phone Number 1 is too short')
    .max(15, 'Phone Number 1 is too long'),
  subPhoneNumber: z
    .string()
    .min(9, 'Phone Number 1 is too short')
    .max(15, 'Phone Number 1 is too long'),
  email: emailField,
  city: z.string().min(2, 'City name must be at least 2 characters').max(100),
  residential: z
    .string()
    .min(5, 'Residential address must be at least 5 characters')
    .max(200),
});

export type ContactDetailsInput = z.infer<typeof contactDetails>;
