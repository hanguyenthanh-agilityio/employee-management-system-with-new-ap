'use server';

import { revalidatePath } from 'next/cache';

// Constants
import { ENDPOINT_LEAVE, ERROR_MESSAGE } from '@/constants';

// Services
import {
  getLeaveApplicationById,
  getLeaveApplications,
  postLeaveApplication,
  patchLeaveApplication,
  deleteLeave,
  exportLeave,
  getCurrentUser,
} from '@/services/apiService';

// Types
import { LeaveApplication } from '@/types/components';

// Utils
import {
  LeaveApplicationInput,
  leaveApplicationSchema,
} from '@/utils/schemas/leaveApplicationSchema';

export const getAuthenticatedUserId = async () => {
  const userData = await getCurrentUser();

  return userData.id;
};

// Get Leave Applications
export const fetchLeaveApplications = async (id: number) => {
  const data: LeaveApplication = await getLeaveApplications(id);
  return data;
};

// Get Leave Application by ID
export const fetchLeaveApplicationById = async (documentId: string) => {
  const data = await getLeaveApplicationById(documentId);

  return data;
};

// Create Leave Application
export const createLeaveApplication = async (data: LeaveApplicationInput) => {
  const user = await getCurrentUser();

  const fullData: LeaveApplicationInput = {
    ...data,
    users_permissions_user: user.id,
    employeeName: user.username ?? 'unknown',
  };

  const parsed = leaveApplicationSchema.safeParse(fullData);
  if (!parsed.success) {
    throw new Error(ERROR_MESSAGE.VALIDATION_FAILED);
  }

  try {
    await postLeaveApplication({ data: parsed.data });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create leave application.',
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
  const parsed = leaveApplicationSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(ERROR_MESSAGE.VALIDATION_FAILED);
  }

  try {
    await patchLeaveApplication(documentId, parsed.data);
    revalidatePath(ENDPOINT_LEAVE);

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
  revalidatePath(ENDPOINT_LEAVE);
};

// Export Leave Applications
export const exportLeaveApplications = async (
  format: 'pdf' | 'csv' | 'excel',
) => {
  const blob = await exportLeave(format);

  return blob;
};
