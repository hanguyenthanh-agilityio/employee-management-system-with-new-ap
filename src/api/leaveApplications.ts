'use server';

import { revalidateTag } from 'next/cache';

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
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';
import { validateLeaveApplication } from '@/utils/validate';

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

  const validateData = validateLeaveApplication(fullData);

  try {
    await postLeaveApplication({ data: validateData });
    console.log('revalidateTag leave-apps at', new Date().toISOString());
    revalidateTag('leave-apps');
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

// Export Leave Applications
export const exportLeaveApplications = async (
  format: 'pdf' | 'csv' | 'excel',
) => {
  const blob = await exportLeave(format);

  return blob;
};
