'use server';

// Constants
import { API, API_URL, USER_FILTER_PREFIX } from '@/constants/api_url';

// Utils
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';

/** Fetch all leave applications for a user */
export const fetchLeaveApplications = async (userId: number) => {
  const url = `${API_URL}${API.BASE}?${USER_FILTER_PREFIX}=${userId}&&populate[users_permissions_user][fields]=username&populate=document`;
  return fetchWithAuth(url, { method: 'GET', revalidateTags: ['leave-apps'] });
};

/** Fetch leave application by documentId */
export const fetchLeaveApplicationById = async (documentId: string) => {
  const url = `${API_URL}${API.BASE}/${documentId}?populate=document`;

  return fetchWithAuth(url, { method: 'GET', revalidateTags: ['leave-apps'] });
};

/** Fetch leave summary for a user */
export const getSummaryLeaves = async (userId: number) => {
  const url = `${API_URL}${API.SUMMARY_LEAVES}?${USER_FILTER_PREFIX}=${userId}`;

  return fetchWithAuth(url, { method: 'GET' });
};

/** Create a new leave application */
export const postLeaveApplication = async (payload: {
  data: LeaveApplicationInput;
}) => {
  const url = `${API_URL}${API.BASE}`;

  return fetchWithAuth(url, { method: 'POST', body: JSON.stringify(payload) });
};

/** Update leave application by documentId */
export const patchLeaveApplication = async (
  documentId: string,
  payload: LeaveApplicationInput,
) => {
  const url = `${API_URL}${API.BASE}/${documentId}`;

  return fetchWithAuth(url, {
    method: 'PUT',
    body: JSON.stringify({ data: payload }),
  });
};

/** Delete leave application */
export const deleteLeave = async (documentId: string) => {
  const url = `${API_URL}${API.BASE}/${documentId}`;

  await fetchWithAuth(url, { method: 'DELETE', skipJson: true });

  return documentId;
};
