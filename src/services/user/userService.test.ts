import { API_URL, ERROR_MESSAGE } from '@/constants';
import { getCurrentUser, updateProfile } from './userService';

jest.mock('@/utils/auth', () => ({
  getTokenFromCookies: jest.fn(() => Promise.resolve('test-token')),
}));

const mockCookieStore = {
  get: jest.fn(),
};

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => mockCookieStore),
}));

const mockFetch = jest.fn();

beforeAll(() => {
  global.fetch = mockFetch;
  jest.clearAllMocks();
  (fetch as jest.Mock).mockClear();
});

describe('userService', () => {
  describe('getCurrentUser', () => {
    test('Returns user data when fetch is successful', async () => {
      const mockUser = { id: 1, username: 'my' };

      (fetch as jest.Mock).mockResolvedValue('token123');
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await getCurrentUser();

      expect(result).toEqual(mockUser);
    });

    test('Throws error if fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValue('token123');
      mockFetch.mockResolvedValue({ ok: false });

      await expect(getCurrentUser()).rejects.toThrow(
        ERROR_MESSAGE.FAILED_TO_FETCH_USER,
      );
    });
  });

  describe('updateProfile', () => {
    const userId = '123';
    const inputData = {
      username: 'Test User',
      department: 'Engineering',
      jobTitle: 'Developer',
      jobCategory: 'Tech',
    };

    test('Returns success: true when update is successful', async () => {
      (fetch as jest.Mock).mockResolvedValue('test-token');
      mockFetch.mockResolvedValue({
        ok: true,
      });

      const result = await updateProfile(userId, inputData);

      expect(fetch).toHaveBeenCalledWith(
        `${API_URL}/users/${userId}`,
        expect.objectContaining({
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
          body: JSON.stringify(inputData),
        }),
      );
      expect(result).toEqual({ success: true });
    });

    test('Returns correct message and statusCode when API returns error', async () => {
      const errorMessage = 'Invalid user data';

      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValue({
          error: { message: errorMessage },
        }),
      });

      const result = await updateProfile(userId, inputData);

      expect(result).toEqual({
        success: false,
        message: errorMessage,
        statusCode: 400,
      });
    });

    test('Returns MISSING_TOKEN error if token is not found', async () => {
      const { getTokenFromCookies } = await import('@/utils/auth');
      (getTokenFromCookies as jest.Mock).mockResolvedValue(null);

      const result = await updateProfile(userId, inputData);

      expect(result).toEqual({
        success: false,
        message: ERROR_MESSAGE.MISSING_TOKEN,
      });
    });

    test('Returns UNEXPECTED error on fetch exception', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await updateProfile(userId, inputData);

      expect(result).toEqual({
        success: false,
        message: 'Authentication token is missing',
      });
    });
  });
});
