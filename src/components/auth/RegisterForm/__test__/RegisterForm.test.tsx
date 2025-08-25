import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { registerAction } from '@/actions/auth-action';
import { toast } from 'react-toastify';
import RegisterForm from '..';

// Mock router

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => jest.fn()),
}));

// Mock registerAction
jest.mock('@/actions/auth-action', () => ({
  registerAction: jest.fn(),
}));

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('RegisterForm', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it('submits successfully and redirects', async () => {
    (registerAction as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Registered successfully',
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail Address/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '0123456789' },
    });

    const [passwordInput, confirmPasswordInput] =
      screen.getAllByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Password123' },
    });

    fireEvent.click(screen.getByLabelText(/terms/i));
    const submitButton = screen.getByRole('button', {
      name: /create account/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(registerAction).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        'Account created successfully!',
        expect.any(Object),
      );
      const onClose = (toast.success as jest.Mock).mock.calls[0][1].onClose;
      onClose?.();

      expect(pushMock).toHaveBeenCalledWith('/login');
    });
  });

  it('shows error toast when register fails', async () => {
    (registerAction as jest.Mock).mockResolvedValue({
      success: false,
      message: 'Email already exists',
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail Address/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '0123456789' },
    });

    const [passwordInput, confirmPasswordInput] =
      screen.getAllByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'secret123' } });

    fireEvent.click(screen.getByLabelText(/terms/i));
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    const submitButton = screen.getByRole('button', {
      name: /(create account|creating account)/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Email already exists',
        expect.any(Object),
      );
    });
  });
});
