'use server';

import { revalidateTag } from 'next/cache';

// Services
import { getCachedUser } from '@/services/user/userService';
import {
  deleteLeave,
  getSummaryLeaves,
  patchLeaveApplication,
  postLeaveApplication,
} from '@/services/leave/leaveService';

// Utils
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';
import { validateLeaveApplication } from '@/utils/validate';

// Create Leave Application
export const createLeaveApplication = async (data: LeaveApplicationInput) => {
  try {
    const user = await getCachedUser();

    if (!user || !user.id) {
      throw new Error(
        'User information is missing. Cannot submit application.',
      );
    }

    const fullData: LeaveApplicationInput = {
      ...data,
      users_permissions_user: user.id,
      employeeName: user.username ?? 'unknown',
    };

    const validateData = validateLeaveApplication(fullData);

    await postLeaveApplication({ data: validateData });

    revalidateTag('leave-apps');

    return { success: true };
  } catch (error) {
    console.error('Error in createLeaveApplication:', error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Unknown error while creating leave application.',
    };
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
  const validateData = validateLeaveApplication(data);

  try {
    await patchLeaveApplication(documentId, validateData);
    // Apply revalidateTag
    revalidateTag('leave-apps');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update leave application.',
    };
  }
};

// Delete Leave Application
export const deleteLeaveApplication = async (id: string) => {
  await deleteLeave(id);
  revalidateTag('leave-apps');
};

// Get Summary Leaves
export const fetchSummaryLeaves = async () => {
  try {
    const userId = await getCachedUser();
    const summary = await getSummaryLeaves(userId.id);

    return { success: true, data: summary };
  } catch (error) {
    return {
      success: false,
      message: 'Unable to load summary leaves',
    };
  }
};
