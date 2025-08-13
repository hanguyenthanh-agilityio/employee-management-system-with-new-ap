import { render, screen, fireEvent } from '@testing-library/react';
import ProfileDropdown from '..';

describe('ProfileDropdown', () => {
  test('should not show dropdown initially', () => {
    render(<ProfileDropdown isLoading={false} onClick={() => {}} />);
    expect(screen.queryByTestId('dropdown')).toBeNull();
  });

  test('should show dropdown when button is clicked', () => {
    render(<ProfileDropdown isLoading={false} onClick={() => {}} />);
    fireEvent.click(screen.getByTestId('profile-button'));
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });
});
