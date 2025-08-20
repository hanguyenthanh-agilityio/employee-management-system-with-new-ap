import { ERROR_MESSAGE, NEXT_PUBLIC_API_URL } from '@/constants';
import { loginUser, registerUser } from './authService';

describe('auth API', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
    process.env.NEXT_PUBLIC_API_URL = 'https://mocked-api.com';
  });

  describe('login', () => {
    const payload = {
      identifier: 'hanguyen@gmail.com',
      password: '123456',
    };

    test('Calls fetch with correct params', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ jwt: 'token', user: { id: 1 } }),
      });

      const result = await loginUser(payload);

      expect(fetch).toHaveBeenCalledWith(
        `${NEXT_PUBLIC_API_URL}/api/auth/local`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }),
      );

      expect(result).toEqual({ jwt: 'token', user: { id: 1 } });
    });

    test('Throws error with API message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          error: { message: ERROR_MESSAGE.INVALID_CREDENTIALS },
        }),
      });

      await expect(loginUser(payload)).rejects.toThrow(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
      );
    });

    test('Throws default error if JSON fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => {
          throw new Error('bad json');
        },
      });

      await expect(loginUser(payload)).rejects.toThrow(
        ERROR_MESSAGE.LOGIN_FAILED,
      );
    });
  });

  describe('register', () => {
    const payload = {
      username: 'newuser',
      email: 'hanguyen@gmail.com',
      password: '123456789',
    };

    test('Returns data on success', async () => {
      const mockResponse = { jwt: 'token', user: { id: 2 } };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await registerUser(payload);
      expect(result).toEqual(mockResponse);
    });

    test('Throws error with API message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          error: { message: 'Email already taken' },
        }),
      });

      await expect(registerUser(payload)).rejects.toThrow(
        'Email already taken',
      );
    });

    test('Throws default error if no message provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

      await expect(registerUser(payload)).rejects.toThrow(
        ERROR_MESSAGE.REGISTER_FAILED,
      );
    });
  });
});
