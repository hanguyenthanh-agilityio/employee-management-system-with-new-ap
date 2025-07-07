import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  department: z.string().min(1, 'Department is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobCategory: z.string().min(1, 'Job category is required'),
});

export type ProfileInput = z.infer<typeof profileSchema>;
