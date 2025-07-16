'use server';

import { cookies } from 'next/headers';

// Constants
import { API, API_URL, USER_FILTER_PREFIX } from '@/constants/api_url';
import { ERROR_MESSAGE } from '@/constants/error';

// Utils
import { getTokenFromCookies } from '@/utils/auth';
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';

type LoginPayload = {
  identifier: string;
  password: string;
};

export const login = async (data: LoginPayload) => {
  const res = await fetch(`${API_URL}${API.LOGIN}`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const dataRes = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      dataRes?.error?.message || dataRes?.message || 'Login failed';
    throw new Error(message);
  }

  return dataRes;
};

export const getCurrentUser = async () => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch current user info');
  }

  return res.json();
};

// Fetch API Register
export const register = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}${API.REGISTER}`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();

    throw new Error(
      errorData?.error?.message ||
        errorData.message ||
        ERROR_MESSAGE.REGISTER_FAILED,
    );
  }

  return res.json();
};

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
      cache: 'no-store',
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
    // cache: 'no-store',
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
    // Caching data
    cache: 'no-store',
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

// Upload file
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('document', file);

  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();

    console.error('Upload failed:', text);

    throw new Error('Upload document fail');
  }

  const json = await res.json();

  if (!Array.isArray(json) || !json[0]?.id) {
    throw new Error('Invalid upload response: missing document ID.');
  }

  return res.json();
};

// Get user to reuse
export const getCachedUser = async () => {
  const getUserCookie = cookies().get('user')?.value;

  if (!getUserCookie) {
    throw new Error(ERROR_MESSAGE.USER_CACHE_NOT_FOUND);
  }

  try {
    return JSON.parse(getUserCookie);
  } catch (error) {
    throw new Error(ERROR_MESSAGE.INVALID_CACHE);
  }
};
