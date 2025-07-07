import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import ProfileSidebar from '..';

// Constants
import { TABS_SIDEBAR } from '@/constants';

describe('ProfileSidebar component', () => {
  test('renders all tabs', () => {
    render(<ProfileSidebar selected="Personal Details" onSelect={() => {}} />);
    TABS_SIDEBAR.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  test('highlights selected tab', () => {
    render(<ProfileSidebar selected="Contact Details" onSelect={() => {}} />);
    const selectedButton = screen.getByText('Contact Details');
    expect(selectedButton).toHaveClass('bg-yellow');
  });

  test('calls onSelect when a tab is clicked', () => {
    const handleSelect = jest.fn();
    render(
      <ProfileSidebar selected="Personal Details" onSelect={handleSelect} />,
    );

    const tabToClick = screen.getByText('Contact Details');
    fireEvent.click(tabToClick);

    expect(handleSelect).toHaveBeenCalledWith('Contact Details');
  });
});
