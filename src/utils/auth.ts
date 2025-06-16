/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';

export const getTokenFromCookies = async (): Promise<string> => {
  const token = (await cookies()).get('jwtToken')?.value;
  if (!token) throw new Error('Token not found');
  return token;
};

// Set a cookie
export const setCookie = async (
  name: string,
  value: string,
  option?: Record<string, any>,
) => {
  const cookieStore = await cookies();

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
