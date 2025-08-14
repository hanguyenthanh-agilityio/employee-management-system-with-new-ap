'use server';

import { cookies } from 'next/headers';

// Constants
import { API_URL } from '@/constants/api_url';
import { ERROR_MESSAGE } from '@/constants/error';

// Utils
import { getTokenFromCookies } from '@/utils/auth';
import {
  ContactDetailsInput,
  PersonalDetailsInput,
} from '@/utils/schemas/updateProfile';

export const getCurrentUser = async () => {
  const token = await getTokenFromCookies();

  const res = await fetch(`${API_URL}/users/me?populate=avatar`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ['current-user'] },
  });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.FAILED_TO_FETCH_USER);
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

// Update Profile
export const updateProfile = async (
  userId: string,
  data: PersonalDetailsInput | ContactDetailsInput,
) => {
  const token = await getTokenFromCookies();

  if (!token) {
    return {
      success: false,
      message: ERROR_MESSAGE.MISSING_TOKEN,
    };
  }

  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.json();

      return {
        success: false,
        message: errorText.error.message || ERROR_MESSAGE.UPDATE_USER_FAIL,
        statusCode: res.status,
      };
    }

    return { success: true };
  } catch (error) {
    return { success: false, message: ERROR_MESSAGE.UNEXPECTED };
  }
};
