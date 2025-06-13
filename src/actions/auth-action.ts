'use server';

import { cookies } from 'next/headers';

// Services
import { login, register } from '@/services/apiService';

// Utils
import { LoginInput, loginSchema, RegisterInput } from '@/utils';

// Constants
import { ERROR_MESSAGE, SUCCESS_MESSAGES } from '@/constants';

// Logout action
export const loginAction = async (_: unknown, formData: LoginInput) => {
  const parsed = loginSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors.map((e) => e.message).join(', '),
    };
  }

  try {
    const payload = {
      identifier: parsed.data.email,
      password: parsed.data.password,
    };

    const data = await login(payload);

    if (!data.jwt) {
      return {
        success: false,
        message: data.message || ERROR_MESSAGE.INVALID_CREDENTIALS,
      };
    }

    // Set token to cookie
    (await cookies()).set('jwtToken', data.jwt, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 12,
      sameSite: 'lax',
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : ERROR_MESSAGE.LOGIN_FAILED,
    };
  }
};

export const logoutAction = async () => {
  const cookieStore = await cookies();

  cookieStore.set('jwtToken', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0,
  });

  return { success: true };
};

// Register action
export const registerAction = async (data: RegisterInput) => {
  try {
    const username = `${data.firstName || ''} ${data.lastName || ''}`.trim();

    const fullUsername = username === '' ? data.email : username;

    const strapiRegisterPayload = {
      username: fullUsername,
      email: data.email,
      password: data.password,
    };

    const response = await register(strapiRegisterPayload);

    return {
      success: true,
      message: response.message || SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
    };
  } catch (err: unknown) {
    console.error('Register error:', err);

    return {
      success: false,
      message:
        err instanceof Error ? err.message : ERROR_MESSAGE.UNKNOWN_REGISTER,
    };
  }
};
