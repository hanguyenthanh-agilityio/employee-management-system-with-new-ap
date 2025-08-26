'use server';

import { revalidateTag } from 'next/cache';

// Services
import { getCurrentUser } from '@/services/user/userService';
import {
  deleteLeave,
  getSummaryLeaves,
  patchLeaveApplication,
  postLeaveApplication,
} from '@/services/leave/leaveService';

// Utils
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';
import { validateLeaveApplication } from '@/utils/validate';

// Constants
import { ERROR_MESSAGE } from '@/constants';
import { ServerError, UserError } from '@/utils/error';

/**
 * Server action: create leave application
 * Throw UserError if validation fails or user is missing
 * Throw ServerError if server has problem
 */
export const createLeaveApplication = async (data: LeaveApplicationInput) => {
  try {
    const user = await getCurrentUser();

    if (!user || !user.id) {
      throw new UserError(ERROR_MESSAGE.MISSING_USER, 401);
    }

    const fullData: LeaveApplicationInput = {
      ...data,
      users_permissions_user: user.id,
      employeeName: user.username ?? 'unknown',
    };

    const validateData = validateLeaveApplication(fullData);

    if (!validateData) throw new UserError(ERROR_MESSAGE.VALIDATION_FAILED);

    await postLeaveApplication({ data: validateData });

    // Revalidate tag to update cache server
    revalidateTag('leave-apps');

    return { success: true };
  } catch (error) {
    if (error instanceof UserError || error instanceof ServerError) {
      throw error;
    }
    throw new ServerError('Unexpected error from server', 500);
  }
};

// Update Leave Application
export const updateLeaveApplication = async (
  documentId: string,
  data: {
    type: string;
    startDate: string;
    endDate: string;
    durations: number;
    resumptionDate: string;
    reason: string;
  },
) => {
  try {
    const validateData = validateLeaveApplication(data);

    if (!validateData) throw new Error(ERROR_MESSAGE.VALIDATION_FAILED);

    await patchLeaveApplication(documentId, validateData);
    // Apply revalidateTag
    revalidateTag('leave-apps');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: ERROR_MESSAGE.UPDATE_LEAVE_FAILED,
    };
  }
};

// Delete Leave Application
export const deleteLeaveApplication = async (id: string) => {
  try {
    await deleteLeave(id);
    revalidateTag('leave-apps');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: ERROR_MESSAGE.DELETE_LEAVE_FAILED,
    };
  }
};

// Get Summary Leaves
export const fetchSummaryLeaves = async () => {
  try {
    const user = await getCurrentUser();

    if (!user?.id) throw new Error(ERROR_MESSAGE.MISSING_USER);

    const summary = await getSummaryLeaves(user.id);

    return { success: true, data: summary };
  } catch (error) {
    return {
      success: false,
      message: ERROR_MESSAGE.SUMMARY_LEAVE_FAILED,
    };
  }
};
