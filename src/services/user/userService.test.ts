import { API_URL, ERROR_MESSAGE } from '@/constants';
import { getCachedUser, getCurrentUser, updateProfile } from './userService';

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

  describe('getCachedUser', () => {
    test('Returns parsed user from cookie', async () => {
      const mockUser = { id: 1, username: 'my' };
      mockCookieStore.get.mockReturnValue({ value: JSON.stringify(mockUser) });

      const result = await getCachedUser();
      expect(result).toEqual(mockUser);
    });

    test('Throws error if no cookie found', async () => {
      mockCookieStore.get.mockReturnValue(undefined);

      await expect(getCachedUser()).rejects.toThrow(
        ERROR_MESSAGE.USER_CACHE_NOT_FOUND,
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
  });
});
