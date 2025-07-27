import { cookies } from 'next/headers';
import { getTokenFromCookies, removeCookie, setCookie } from './auth';
import { ERROR_MESSAGE } from '@/constants';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

const mockCookieStore = {
  get: jest.fn(),
  set: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
});

describe('cookie ', () => {
  test('GetTokenFromCookies returns token if exists', async () => {
    mockCookieStore.get.mockReturnValue({ value: '123' });

    const token = await getTokenFromCookies();

    expect(token).toBe('123');
    expect(mockCookieStore.get).toHaveBeenCalledWith('jwtToken');
  });

  test('getTokenFromCookies throws error if no token', async () => {
    mockCookieStore.get.mockReturnValue(undefined);

    await expect(getTokenFromCookies()).rejects.toThrow(
      ERROR_MESSAGE.TOKEN_NOT_FOUND,
    );
  });

  test('setCookie calls cookieStore.set with default options', async () => {
    await setCookie('jwtToken', '123');

    expect(mockCookieStore.set).toHaveBeenCalledWith(
      'jwtToken',
      '123',
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'lax',
      }),
    );
  });

  test('removeCookie calls cookieStore.set with maxAge: 0', async () => {
    await removeCookie('jwtToken');

    expect(mockCookieStore.set).toHaveBeenCalledWith(
      'jwtToken',
      '',
      expect.objectContaining({
        maxAge: 0,
      }),
    );
  });
});
