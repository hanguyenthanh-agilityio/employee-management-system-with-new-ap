/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { ERROR_MESSAGE } from '@/constants';
import { cookies } from 'next/headers';

// Get Token form cookie in server
export const getTokenFromCookies = async (): Promise<string> => {
  const token = (await cookies()).get('jwtToken')?.value;
  if (!token) throw new Error(ERROR_MESSAGE.TOKEN_NOT_FOUND);
  return token;
};

// Set a cookie
export const setCookie = async (
  name: string,
  value: string,
  option?: Record<string, any>,
) => {
  const cookieStore = await cookies();
  /**
   * httpOnly: protects against JS access
   * secure: only sends over HTTPS
   * sameSite: 'lax': CSRF protection
   * path: '/': cookie valid for entire site
   */
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
    ...option,
  });
};

// Remove a cookie
export const removeCookie = async (name: string) => {
  const cookieStore = await cookies();

  cookieStore.set(name, '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  });
};
