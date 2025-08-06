'use server';

import { revalidateTag } from 'next/cache';

// Services
import { removeCookie, setCookie } from '@/utils/auth';
import { login, register } from '@/services/auth/authService';
import { getCurrentUser } from '@/services/user/userService';

// Utils
import {
  LoginInput,
  loginSchema,
  RegisterInput,
} from '@/utils/schemas/authSchema';

// Constants
import { ERROR_MESSAGE, SUCCESS_MESSAGES } from '@/constants';

// Login action
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
    await setCookie('jwtToken', data.jwt, {
      maxAge: 60 * 60 * 12,
    });

    revalidateTag('current-user');

    const user = await getCurrentUser();

    //  Set user to cookie
    await setCookie('user', JSON.stringify(user), {
      maxAge: 60 * 60 * 12,
    });

    return { success: true, data: user };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : ERROR_MESSAGE.LOGIN_FAILED,
    };
  }
};

export const logoutAction = async () => {
  await removeCookie('jwtToken');
  return { success: true };
};

// Register action
export const registerAction = async (data: RegisterInput) => {
  try {
    const { firstName = '', lastName = '', email } = data;
    const fullUsername = `${firstName}${lastName}`.trim() || email;

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
    return {
      success: false,
      message:
        err instanceof Error ? err.message : ERROR_MESSAGE.UNKNOWN_REGISTER,
    };
  }
};
