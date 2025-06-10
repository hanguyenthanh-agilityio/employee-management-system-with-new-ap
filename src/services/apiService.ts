// Constants
import { API, API_URL } from '@/constants/api_url';
import { ERROR_MESSAGE } from '@/constants/error';

// Utils
import { getTokenFromCookies } from '@/utils/auth';
import { RegisterInput } from '@/utils/schemas/authSchema';
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';

type LoginPayload = {
  identifier: string;
  password: string;
};

export const login = async (data: LoginPayload) => {
  const res = await fetch(`${API_URL}${API.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Login error response:', res.status, errorText);
    throw new Error('Login failed');
  }

  return res.json();
};

export const getCurrentUser = async () => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch current user info');
  }

  return res.json();
};

// Fetch API Register
export const register = async (data: RegisterInput) => {
  const res = await fetch(`${API_URL}${API.REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || ERROR_MESSAGE.REGISTER_FAILED);
  }

  return res.json();
};

// Fetch API Activate Account
// export const activateAccount = async (uid: string, token: string) => {
//   const res = await fetch(
//     `${NEXT_PUBLIC_API_URL}${API.ACTIVATE}${uid}/${token}/`,
//     {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//       },
//     },
//   );

//   const contentType = res.headers.get('content-type');

//   if (!res.ok) {
//     if (contentType?.includes('application/json')) {
//       const errorData = await res.json();
//       throw new Error(errorData.message || ERROR_MESSAGE.ACTIVATION_FAILED);
//     } else {
//       const errorText = await res.text();
//       throw new Error(
//         'Activation failed. Response: ' + errorText.slice(0, 100),
//       );
//     }
//   }

//   if (contentType?.includes('application/json')) {
//     return res.json();
//   }

//   return { message: 'Activation response received, but not in JSON format.' };
// };

// Get Leave Applications

export const getLeaveApplications = async () => {
  const token = await getTokenFromCookies();

  console.log('TOKEN:', token);

  const res = await fetch(`${API_URL}${API.BASE}`, {
    method: 'GET',
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch leave history');
  }

  return res.json();
};

// Get leave application ID
export const getLeaveApplicationById = async (documentId: string) => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}${API.BASE}/${documentId}`, {
    method: 'GET',
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
    next: { revalidate: 60 },
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
    console.error('API Delete error:', res.status, errorText);
    throw new Error('Failed to delete leave application');
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

  console.log('Calling export API:', format);

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
