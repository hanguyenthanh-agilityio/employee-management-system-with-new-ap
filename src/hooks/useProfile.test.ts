import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// Constants
import { ERROR_MESSAGE } from '@/constants';

// Hooks
import { useUpdateProfile } from './useProfile';

// Services
import { updateProfile } from '@/services';

// Mock API và useRouter
jest.mock('@/services');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('useUpdateProfile', () => {
  const mockUpdateProfile = updateProfile as jest.Mock;
  const mockRefresh = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ refresh: mockRefresh });
    jest.clearAllMocks();
  });

  const mockData = {
    id: '1',
    username: 'Biruk Dawit',
    department: 'Design & Marketing',
    jobTitle: 'UI / UX Designer',
    jobCategory: 'Full time',
    avatar: 'https://cdn.example.com/avatar.png',
  };

  test('Should update successfully and refresh router', async () => {
    // API successful
    mockUpdateProfile.mockResolvedValue({ success: true });
    // Call hook
    const { result } = renderHook(() => useUpdateProfile());

    await act(async () => {
      // Call Update func in hook
      const res = await result.current.update(mockData, 'user');

      // Check the results returned from updateProfile
      expect(res.success).toBe(true);
    });

    // Make sure the function is called correctly with the data (user = user)
    expect(mockUpdateProfile).toHaveBeenCalledWith('user', mockData);

    // Make sure router.refresh() is called
    expect(mockRefresh).toHaveBeenCalled();

    // No error
    expect(result.current.errorMessage).toBeNull();
  });

  test('Should handle API failure with message', async () => {
    // API return res false with message
    mockUpdateProfile.mockResolvedValue({
      success: false,
      message: 'Invalid data',
    });

    const { result } = renderHook(() => useUpdateProfile());

    await act(async () => {
      const res = await result.current.update(mockData, 'user-456');

      // The result returned is failure
      expect(res.success).toBe(false);
    });

    // React router does not refresh the page
    expect(mockRefresh).not.toHaveBeenCalled();

    // Make sure error correct
    expect(result.current.errorMessage).toBe('Invalid data');
  });

  test('Should handle API failure with unknown error', async () => {
    // API return res false without message
    mockUpdateProfile.mockResolvedValue({ success: false });

    const { result } = renderHook(() => useUpdateProfile());

    await act(async () => {
      const res = await result.current.update(mockData, 'user-789');
      expect(res.success).toBe(false);
    });

    expect(result.current.errorMessage).toBe(ERROR_MESSAGE.UNKNOWN);
  });

  it('should handle network error (catch block)', async () => {
    // mock updateProfile function to throw error instead of returning normal data
    mockUpdateProfile.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useUpdateProfile());

    await act(async () => {
      const res = await result.current.update(mockData, 'user-000');
      expect(res.success).toBe(false);
    });

    expect(result.current.errorMessage).toBe(ERROR_MESSAGE.UNKNOWN);
  });
});
