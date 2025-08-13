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

  test('should show loading when isLoading = true', () => {
    render(<ProfileDropdown isLoading={true} onClick={() => {}} />);
    fireEvent.click(screen.getByTestId('profile-button'));

    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });

  test('should show logout button when isLoading = false', () => {
    const onClickMock = jest.fn();
    render(<ProfileDropdown isLoading={false} onClick={onClickMock} />);
    fireEvent.click(screen.getByTestId('profile-button'));

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
