import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from '..';

describe('PasswordInput component', () => {
  test('Renders input with type password by default', () => {
    render(<PasswordInput placeholder="Password" />);
    const input = screen.getByPlaceholderText('Password') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('password');
  });

  test('Toggles to type text when eye icon is clicked', () => {
    render(<PasswordInput placeholder="Password" />);
    const input = screen.getByPlaceholderText('Password') as HTMLInputElement;
    const toggleButton = screen.getByRole('button');

    fireEvent.click(toggleButton);
    expect(input.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(input.type).toBe('password');
  });

  test('Shows red border if error is passed', () => {
    render(<PasswordInput placeholder="Password" error="Required" />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveClass('border-red');
  });
});
