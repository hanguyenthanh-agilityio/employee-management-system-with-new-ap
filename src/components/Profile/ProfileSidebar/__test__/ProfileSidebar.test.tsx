import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

// Component
import ProfileSidebar from '..';

// Constants
import { TABS_SIDEBAR } from '@/constants';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('ProfileSidebar component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all tabs', () => {
    (usePathname as jest.Mock).mockReturnValue(
      '/dashboard/update-profile/personal-details',
    );

    render(<ProfileSidebar />);
    TABS_SIDEBAR.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('highlights active tab', () => {
    (usePathname as jest.Mock).mockReturnValue(
      '/dashboard/update-profile/contact-details',
    );

    render(<ProfileSidebar />);
    const activeTab = screen.getByText('Contact Details');
    expect(activeTab).toHaveClass('bg-yellow');
  });

  test('non-active tabs have light background', () => {
    (usePathname as jest.Mock).mockReturnValue(
      '/dashboard/update-profile/personal-details',
    );

    render(<ProfileSidebar />);
    const inactiveTab = screen.getByText('Contact Details');
    expect(inactiveTab).toHaveClass('bg-lightBlue');
  });
});
