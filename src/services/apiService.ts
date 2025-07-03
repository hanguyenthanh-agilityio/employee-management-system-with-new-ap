// Constants
import { API, API_URL } from '@/constants/api_url';
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
  console.log('🟢 [SERVER] Fetching leave apps at', new Date().toISOString());

  const token = await getTokenFromCookies();

  const res = await fetch(
    `${API_URL}${API.BASE}?filters[users_permissions_user][id][$eq]=${id}`,
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
  console.log(
    '🟢 [SERVER] Fetching leave apps from API at',
    new Date().toISOString(),
  );
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}${API.BASE}/${documentId}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ['leave-apps'] },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch leave application with documentId ${documentId}`,
    );
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
    cache: 'no-store',
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
    const errorText = await res.text();
    throw new Error(`API Error: ${res.status} - ${errorText}`);
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

/**
 * FETCH API EXPORT
 * Get authentication token from cookies
 * Call api to download export file in format
 * Check if API error
 * Returns blob data from server
 */
export const exportLeave = async (
  format: 'pdf' | 'csv' | 'excel',
): Promise<Blob> => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}${API.DOWNLOAD}${format}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to export leave applications as ${format}`);
  }

  return res.blob();
};
