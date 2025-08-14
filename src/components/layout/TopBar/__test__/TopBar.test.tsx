import { render, screen } from '@testing-library/react';

import TopBar from '..';

jest.mock('@/actions/auth-action', () => ({
  logoutAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => '/dashboard',
}));

describe('TopBar component', () => {
  test('Render notification and mail icon', () => {
    render(<TopBar />);
    expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
    expect(screen.getByTestId('envelope-icon')).toBeInTheDocument();
  });
});
