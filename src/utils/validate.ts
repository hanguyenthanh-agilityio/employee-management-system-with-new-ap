// Constants
import { ERROR_MESSAGE } from '@/constants';

// Utils
import { leaveApplicationSchema } from './schemas/leaveApplicationSchema';

// Validate Leave Application input
export const validateLeaveApplication = (data: unknown) => {
  const parsed = leaveApplicationSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(ERROR_MESSAGE.ACTIVATION_FAILED);
  }

  return parsed.data;
};
