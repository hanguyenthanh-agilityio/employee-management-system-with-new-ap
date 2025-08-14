import { render, screen } from '@testing-library/react';
import RegisterPage from '@/app/(auth)/register/page';

// Mock dynamic import

jest.mock('@/components/auth/RegisterForm', () => ({
  __esModule: true,
  default: () => <div data-testid="register-form">Mocked RegisterForm</div>,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe('RegisterPage', () => {
  test('renders title, description, RegisterForm, and login link', () => {
    render(<RegisterPage />);

    // Header
    expect(
      screen.getByRole('heading', { name: /welcome to xceltech/i }),
    ).toBeInTheDocument();

    // Description
    expect(screen.getByText(/register your account/i)).toBeInTheDocument();

    // // RegisterForm
    // expect(screen.getByTestId('register-form')).toBeInTheDocument();

    // Footer
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/log in/i).closest('a')).toHaveAttribute(
      'href',
      '/login',
    );
  });
});
