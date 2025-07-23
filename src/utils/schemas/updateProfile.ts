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
    .min(2, 'Please enter your department')
    .max(100, 'Department name is too long'),
  jobTitle: z
    .string()
    .min(2, 'Please enter your job title')
    .max(100, 'Job title is too long'),
  jobCategory: z
    .string()
    .min(2, 'Please enter your job category')
    .max(100, 'Job category is too long'),
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

export const fullProfileDetails = personalDetails.merge(contactDetails);

export type FullProfileDetailsInput = z.infer<typeof fullProfileDetails>;
