import { z } from 'zod';
import { emailField } from './authSchema';

export const personalDetails = z.object({
  username: z
    .string()
    .min(3, 'Full name must be at least 3 characters long')
    .max(50, 'Full name must be at most 50 characters long')
    .trim()
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  department: z
    .string()
    .min(1, 'Department is required')
    .max(100, 'Department name is too long'),
  jobTitle: z
    .string()
    .min(1, 'Job title is required')
    .max(100, 'Job title is too long'),
  jobCategory: z
    .string()
    .min(1, 'Job category is required')
    .max(100, 'Job category is too long'),
  documentId: z.string().optional(),
  avatar: z
    .union([z.string(), z.instanceof(File)])
    .optional()
    .nullable(),
});

export type PersonalDetailsInput = z.infer<typeof personalDetails>;

const safeTextRegex = /^[a-zA-Z0-9\s,.'-]*$/;

const phoneSchema = z
  .string()
  .transform((val) => val.replace(/\s+/g, ''))
  .refine((val) => /^\d+$/.test(val), {
    message: 'Phone must contain only digits',
  })
  .refine((val) => val.length >= 8, {
    message: 'Phone must be at least 8 digits',
  })
  .refine((val) => val.length <= 10, {
    message: 'Phone must be at most 10 digits',
  });
export const contactDetails = z.object({
  mainPhoneNumber: phoneSchema,
  subPhoneNumber: phoneSchema,
  email: emailField,
  city: z
    .string()
    .trim()
    .min(1, 'City is required')
    .max(100)
    .regex(safeTextRegex, 'City contains invalid characters'),
  residential: z
    .string()
    .trim()
    .min(1, 'Residential address is required')
    .max(200)
    .regex(safeTextRegex, 'Residential address contains invalid characters'),
});

export type ContactDetailsInput = z.infer<typeof contactDetails>;

export const fullProfileDetails = personalDetails.merge(contactDetails);

export type FullProfileDetailsInput = z.infer<typeof fullProfileDetails>;
