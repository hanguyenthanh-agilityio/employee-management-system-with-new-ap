import { fireEvent, render, screen } from '@testing-library/react';

import TopBar from '..';
import { logoutAction } from '@/actions/auth-action';

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

jest.mock('@/components', () => ({
  TopBarNav: ({ onClickItem }: { onClickItem?: () => void }) => (
    <button data-testid="topbar-nav" onClick={onClickItem}>
      Nav
    </button>
  ),
  ProfileDropdown: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="profile-dropdown" onClick={onClick}>
      Profile
    </button>
  ),
}));

jest.mock('@/components/themeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme</div>,
}));

describe('TopBar component', () => {
  test('Render notification and mail icon', () => {
    render(<TopBar />);
    expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
    expect(screen.getByTestId('envelope-icon')).toBeInTheDocument();
  });

  test('Toggle mobile menu on hamburger click', () => {
    render(<TopBar />);
    const hamburger = screen.getByRole('button', { name: /hamburger/i });

    fireEvent.click(hamburger);
    const navs = screen.getAllByTestId('topbar-nav');
    expect(navs).toHaveLength(2);
  });

  test('Close menu when clicking nav item', () => {
    render(<TopBar />);
    const hamburger = screen.getByRole('button', { name: /hamburger/i });

    fireEvent.click(hamburger);
    const navs = screen.getAllByTestId('topbar-nav');
    expect(navs).toHaveLength(2);
  });

  test('Call logout on ProfileDropdown click', async () => {
    render(<TopBar />);
    fireEvent.click(screen.getByTestId('profile-dropdown'));

    expect(logoutAction).toHaveBeenCalled();
  });

  test('Render ThemeToggle', () => {
    render(<TopBar />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });
});
