import { render, screen } from '@testing-library/react';
import LoginPage from '../page';

// Mock LoginForm
jest.mock('@/components/auth/LoginForm', () => ({
  __esModule: true,
  default: () => <div data-testid="login-form">Mocked LoginForm</div>,
}));

describe('LoginPage', () => {
  test('renders the LoginForm component', async () => {
    // page.tsx is an server component: waits for the result of await LoginPage() before rendering
    const Component = await LoginPage();
    render(Component);

    expect(screen.getByTestId('login-form')).toBeInTheDocument();

    expect(screen.getByText('Mocked LoginForm')).toBeInTheDocument();
  });
});
