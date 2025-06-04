'use server';

import { revalidatePath } from 'next/cache';

// Constants
import { ENDPOINT_LEAVE } from '@/constants/api-endpoint';
import { ERROR_MESSAGE } from '@/constants/error';

// Services
import {
  getLeaveApplicationById,
  getLeaveApplications,
  postLeaveApplication,
  patchLeaveApplication,
  deleteLeave,
  exportLeave,
} from '@/services/apiService';

// Types
import { LeaveApplication } from '@/types/components';

// Utils
import { leaveApplicationSchema } from '@/utils/schemas/leaveApplicationSchema';

// Get Leave Applications
export const fetchLeaveApplications = async () => {
  const data: LeaveApplication = await getLeaveApplications();
  return data;
};

// Get Leave Application by ID
export const fetchLeaveApplicationById = async (documentId: string) => {
  const data = await getLeaveApplicationById(documentId);

  return data;
};

// Create Leave Application
export const createLeaveApplication = async (data: {
  type: string;
  startDate: string;
  endDate: string;
  durations: number;
  resumptionDate: string;
  reason: string;
}) => {
  const parsed = leaveApplicationSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(ERROR_MESSAGE.VALIDATION_FAILED);
  }

  const formData = new FormData();
  Object.entries(parsed.data).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  try {
    await postLeaveApplication(formData);
    revalidatePath(ENDPOINT_LEAVE);
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
  id: string,
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

  const formData = new FormData();
  Object.entries(parsed.data).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  try {
    await patchLeaveApplication(id, formData);
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
  console.log('Export started:', format);

  const blob = await exportLeave(format);

  console.log(`Exported ${format}`, blob);

  return blob;
};
