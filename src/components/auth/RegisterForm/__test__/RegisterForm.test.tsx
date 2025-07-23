import { render, screen } from '@testing-library/react';

import { useRouter } from 'next/navigation';
import RegisterForm from '..';

// Mock router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock action
jest.mock('@/actions/auth-action', () => ({
  registerAction: jest.fn(),
}));

describe('RegisterForm', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    jest.clearAllMocks();
  });

  test('renders all input fields and checkboxes', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
      screen.getByText(/Yes, I want to receive KRIS newsletters/i),
    ).toBeInTheDocument();
  });

  it('disables submit button when checkboxes are not checked', () => {
    render(<RegisterForm />);
    const button = screen.getByRole('button', { name: /Create Account/i });
    expect(button).toBeDisabled();
  });
});
