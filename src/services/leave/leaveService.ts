'use server';

// Constants
import { API, API_URL, USER_FILTER_PREFIX } from '@/constants/api_url';

// Utils
import { getTokenFromCookies } from '@/utils/auth';
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';

// Get Leave Applications
export const getLeaveApplications = async (id: number) => {
  const token = await getTokenFromCookies();

  const res = await fetch(
    `${API_URL}${API.BASE}?${USER_FILTER_PREFIX}=${id}&&populate=document`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['leave-apps'], revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch leave history');
  }

  return res.json();
};

// Get leave application ID
export const getLeaveApplicationById = async (documentId: string) => {
  const token = await getTokenFromCookies();

  const res = await fetch(
    `${API_URL}${API.BASE}/${documentId}?populate=document`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['leave-apps'] },
    },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch leave application with documentId ${documentId}`,
    );
  }

  return res.json();
};

export const getSummaryLeaves = async (id: number) => {
  const token = await getTokenFromCookies();

  const res = await fetch(
    `${API_URL}${API.SUMMARY_LEAVES}?${USER_FILTER_PREFIX}=${id}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch summary leaves');
  }

  return res.json();
};

// Create Leave Application
export const postLeaveApplication = async (body: {
  data: LeaveApplicationInput;
}) => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}${API.BASE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error: ${res.status} - ${errorText}`);
  }

  return res.json();
};

// Update Leave Applications
export const patchLeaveApplication = async (
  documentId: string,
  data: LeaveApplicationInput,
) => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}${API.BASE}/${documentId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const contentType = res.headers.get('Content-Type');
    const errorText = contentType?.includes('application/json')
      ? JSON.stringify(await res.json())
      : await res.text();

    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  return res.json();
};

// Delete Leave Application
export const deleteLeave = async (documentId: string) => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}${API.BASE}/${documentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Failed to delete leave application');
  }

  return res;
};
