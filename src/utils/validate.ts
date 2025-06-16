// Constants
import { ERROR_MESSAGE } from '@/constants';

// Utils
import { leaveApplicationSchema } from './schemas/leaveApplicationSchema';

export const registerForm = (formData: FormData) => {
  const email = formData.get('email')?.toString() || '';
  const username = email.split('@')[0] || '';

  return {
    email,
    username,
    firstName: formData.get('firstName')?.toString() || '',
    lastName: formData.get('lastName')?.toString() || '',
    phone: formData.get('phone')?.toString() || '',
    password: formData.get('password')?.toString() || '',
    confirmPassword: formData.get('confirmPassword')?.toString() || '',
    terms: formData.get('terms')?.toString(),
    isReceiveNewsletters: formData.get('newsletter') === 'on',
    role: 'admin',
  };
};

export const loginForm = (formData: FormData) => ({
  email: formData.get('email'),
  password: formData.get('password'),
});

// Validate Leave Application input
export const validateLeaveApplication = (data: unknown) => {
  const parsed = leaveApplicationSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(ERROR_MESSAGE.ACTIVATION_FAILED);
  }

  return parsed.data;
};
