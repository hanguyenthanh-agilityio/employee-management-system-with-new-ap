import { render, screen, fireEvent } from '@testing-library/react';
import TopBarNav from '..';

// Mock LIST_ITEM
jest.mock('@/constants', () => ({
  LIST_ITEM: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Profile', href: '/profile' },
  ],
}));

const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

describe('TopBarNav', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Render all item from LIST_ITEM', () => {
    mockUsePathname.mockReturnValue('/dashboard');
    render(<TopBarNav />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('applies active class to the active item', () => {
    mockUsePathname.mockReturnValue('/dashboard');
    render(<TopBarNav />);
    const dashboardLink = screen.getByText('Dashboard');
    expect(dashboardLink.className).toMatch(/text-primary/);
  });

  test('applies hover class to inactive items', () => {
    mockUsePathname.mockReturnValue('/profile');
    render(<TopBarNav />);
    const dashboardLink = screen.getByText('Dashboard');
    expect(dashboardLink.className).toMatch(/hover:text-primary/);
  });

  test('calls onClickItem when an item is clicked', () => {
    mockUsePathname.mockReturnValue('/dashboard');
    const handleClick = jest.fn();
    render(<TopBarNav onClickItem={handleClick} />);
    fireEvent.click(screen.getByText('Dashboard'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
