import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordField } from '..';
import { PasswordInputProps, RequiredLabelProps } from '@/types/field';

jest.mock('@/components', () => {
  const RequiredLabel = ({
    label,
    htmlFor,
    required,
    className,
  }: RequiredLabelProps) => (
    <label htmlFor={htmlFor} className={className} data-testid="required-label">
      {label}
      {required && <span>*</span>}
    </label>
  );
  RequiredLabel.displayName = 'MockRequiredLabel';
  return { RequiredLabel };
});

jest.mock('@/components/auth/PasswordInput', () => {
  const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    (props, ref) => <input ref={ref} data-testid="password-input" {...props} />,
  );
  PasswordInput.displayName = 'MockPasswordInput';
  return PasswordInput;
});

describe('PasswordField', () => {
  test('renders label and password input', () => {
    render(<PasswordField name="pwd" label="Password" />);
    expect(screen.getByTestId('required-label')).toHaveTextContent('Password');
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  test('renders error message when errorMessage is string', () => {
    render(
      <PasswordField
        name="pwd"
        label="Password"
        errorMessage="Password is required"
      />,
    );
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('renders error message when errorMessage is array', () => {
    render(
      <PasswordField
        name="pwd"
        label="Password"
        errorMessage={['Too short', 'Invalid']}
      />,
    );
    expect(screen.getByText(/too short, invalid/i)).toBeInTheDocument();
  });

  test('accepts user input', () => {
    render(<PasswordField name="pwd" label="Password" />);
    const input = screen.getByTestId('password-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'secret123' } });
    expect(input.value).toBe('secret123');
  });
});
