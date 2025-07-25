'use server';

// Constants
import { API, API_URL } from '@/constants/api_url';
import { ERROR_MESSAGE } from '@/constants/error';

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
