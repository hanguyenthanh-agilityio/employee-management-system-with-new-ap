import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { loginAction } from '@/actions/auth-action';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import LoginForm from '..';

// Mock login action & router
jest.mock('@/actions/auth-action', () => ({
  loginAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginForm', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements correctly', () => {
    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>,
    );

    expect(screen.getByLabelText('E-mail Address')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Password', { selector: 'input' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Submit login form/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
  });

  test('calls loginAction with correct data and redirects on success', async () => {
    (loginAction as jest.Mock).mockResolvedValue({ success: true });

    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>,
    );

    fireEvent.change(screen.getByLabelText(/e-mail address/i), {
      target: { value: 'hanguyen@gmai.com' },
    });
    fireEvent.change(screen.getByLabelText('Password', { selector: 'input' }), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit login form/i }));

    await waitFor(() => {
      expect(loginAction).toHaveBeenCalledWith(undefined, {
        email: 'hanguyen@gmai.com',
        password: 'password123',
      });
      expect(pushMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('shows validation errors on empty input', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /submit login form/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });
});
