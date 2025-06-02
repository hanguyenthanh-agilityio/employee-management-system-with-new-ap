// Constants
import { API, API_URL } from '@/constants/api_url';
import { ERROR_MESSAGE } from '@/constants/error';

// Utils
import { getTokenFromCookies } from '@/utils/auth';
import { RegisterInput } from '@/utils/schemas/authSchema';

// Fetch API Login
// export const login = async (data: LoginInput) => {
//   const res = await fetch(`${API_URL}${API.LOGIN}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//     // body: JSON.stringify(data),
//     body: JSON.stringify({
//       identifier: data.email,
//       password: data.password,
//     }),
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message || ERROR_MESSAGE.LOGIN_FAILED);
//   }

//   return res.json();
// };

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
export const getLeaveApplicationById = async (id: string) => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}${API.BASE}${id}`, {
    method: 'GET',
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch leave application with ID ${id}`);
  }

  return res.json();
};

// Create Leave Application
export const postLeaveApplication = async (formData: FormData) => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}${API.BASE}`, {
    method: 'POST',
    next: { revalidate: 60 },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error: ${res.status} - ${errorText}`);
  }

  return res;
};

// Update Leave Applications
export const patchLeaveApplication = async (id: string, formData: FormData) => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}${API.BASE}${id}/`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error: ${res.status} - ${errorText}`);
  }

  return res;
};

// Delete Leave Application
export const deleteLeave = async (id: string) => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}${API.BASE}${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
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
