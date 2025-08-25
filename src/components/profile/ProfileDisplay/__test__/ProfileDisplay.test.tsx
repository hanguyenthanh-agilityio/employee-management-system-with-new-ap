/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileDisplay } from '@/components';
import { mockProfile } from '@/mocks/profile';
import { AVATAR_URL, ERROR_MESSAGE } from '@/constants';
import { toast } from 'react-toastify';
// import { uploadFileToStrapi } from '@/utils/upload';
import { useUpdateProfile } from '@/hooks/useProfile';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/utils/upload', () => ({
  uploadFileToStrapi: jest.fn(),
}));

jest.mock('@/hooks/useProfile', () => ({
  useUpdateProfile: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock('../../ProfileEditForm', () => ({
  __esModule: true,
  default: ({ form }: any) => {
    const values = form.getValues();
    return (
      <div data-testid="profile-edit-form-fields">
        <input value={values.username} readOnly />
        <input value={values.department} readOnly />
        <input value={values.jobTitle} readOnly />
        <input value={values.jobCategory} readOnly />
      </div>
    );
  },
}));

jest.mock('@/components/common/ui/Avatar', () => ({
  __esModule: true,
  default: ({ url }: { url?: string }) => (
    <div data-testid="avatar" data-src={url} />
  ),
}));

describe('ProfileDisplay', () => {
  const profile = mockProfile;
  const props = { avatarUrl: AVATAR_URL, profile };

  beforeEach(() => {
    (useUpdateProfile as jest.Mock).mockReturnValue({
      update: jest.fn(),
      isPending: false,
      errorMessage: '',
      setErrorMessage: jest.fn(),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (useUpdateProfile as jest.Mock).mockReturnValue({
      update: jest.fn().mockResolvedValue({ success: true }),
      isPending: false,
      errorMessage: '',
      setErrorMessage: jest.fn(),
    });
  });

  test('renders ProfileEditForm inside form', () => {
    render(<ProfileDisplay {...props} />);
    expect(screen.getByTestId('profile-edit-form')).toBeInTheDocument();
    expect(screen.getByTestId('profile-edit-form-fields')).toBeInTheDocument();
  });

  test('renders form fields with default profile values', () => {
    render(<ProfileDisplay {...props} />);
    expect(screen.getByDisplayValue(profile.username)).toBeInTheDocument();
    expect(screen.getByDisplayValue(profile.department)).toBeInTheDocument();
    expect(screen.getByDisplayValue(profile.jobTitle)).toBeInTheDocument();
    expect(screen.getByDisplayValue(profile.jobCategory)).toBeInTheDocument();
  });

  test('click Change button triggers file input click', () => {
    render(<ProfileDisplay {...props} />);
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    const changeButton = screen.getByTestId('change-button');

    const clickSpy = jest.spyOn(fileInput, 'click');
    fireEvent.click(changeButton);
    expect(clickSpy).toHaveBeenCalled();
  });

  test('shows loader when isPending or isLoading is true', () => {
    (useUpdateProfile as jest.Mock).mockReturnValue({
      update: jest.fn(),
      isPending: true,
      errorMessage: '',
      setErrorMessage: jest.fn(),
    });
    render(<ProfileDisplay {...props} />);
    expect(screen.getByTestId('transition-loader')).toBeInTheDocument();
  });

  test('displays error message when errorMessage exists', () => {
    const errorMsg = 'Failed to update profile';
    (useUpdateProfile as jest.Mock).mockReturnValue({
      update: jest.fn(),
      isPending: false,
      errorMessage: errorMsg,
      setErrorMessage: jest.fn(),
    });

    render(<ProfileDisplay {...props} />);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  test('successful form submission shows toast success', async () => {
    const updateMock = jest.fn().mockResolvedValue({ success: true });
    (useUpdateProfile as jest.Mock).mockReturnValue({
      update: updateMock,
      isPending: false,
      errorMessage: '',
      setErrorMessage: jest.fn(),
    });

    render(<ProfileDisplay {...props} />);
    const form = screen.getByTestId('profile-edit-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Profile updated successfully!',
        expect.any(Object),
      );
    });
  });

  test('failed form submission shows toast error', async () => {
    const updateMock = jest
      .fn()
      .mockResolvedValue({ success: false, message: 'Update failed' });
    const setErrorMessage = jest.fn();
    (useUpdateProfile as jest.Mock).mockReturnValue({
      update: updateMock,
      isPending: false,
      errorMessage: '',
      setErrorMessage,
    });

    render(<ProfileDisplay {...props} />);
    const form = screen.getByTestId('profile-edit-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(setErrorMessage).toHaveBeenCalledWith('Update failed');
      expect(toast.error).toHaveBeenCalledWith(
        'Update failed',
        expect.any(Object),
      );
    });
  });

  test('throws unexpected error shows toast error', async () => {
    const updateMock = jest.fn().mockRejectedValue(new Error('Unexpected'));
    const setErrorMessage = jest.fn();

    (useUpdateProfile as jest.Mock).mockReturnValue({
      update: updateMock,
      isPending: false,
      errorMessage: '',
      setErrorMessage,
    });

    render(<ProfileDisplay {...props} />);
    const form = screen.getByTestId('profile-edit-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(setErrorMessage).toHaveBeenCalledWith(ERROR_MESSAGE.UNEXPECTED);
      expect(toast.error).toHaveBeenCalledWith(
        ERROR_MESSAGE.UNEXPECTED,
        expect.any(Object),
      );
    });
  });

  test('updates preview and calls setValue when file is selected', () => {
    const mockUrl = 'blob:mock-url';
    global.URL.createObjectURL = jest.fn(() => mockUrl);

    render(<ProfileDisplay {...props} />);
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;

    const file = new File(['file content'], 'avatar.png', {
      type: 'image/png',
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);

    const avatarDiv = screen.getByTestId('avatar');
    expect(avatarDiv).toHaveAttribute('data-src', mockUrl);
  });
});
