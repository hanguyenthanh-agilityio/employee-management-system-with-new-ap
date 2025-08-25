import React from 'react';
import { render, screen } from '@testing-library/react';
import { InputField } from '..';
import { RequiredLabelProps } from '@/types/field';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

// Mock RequiredLabel
jest.mock('@/components/common/forms/RequiredLabel', () => {
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
  return { __esModule: true, default: RequiredLabel };
});

// Mock Input
jest.mock('@/components/common/inputs/Input/input', () => {
  const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <input ref={ref} data-testid="input-field" {...props} />
  ));
  Input.displayName = 'MockInput';
  return { __esModule: true, default: Input };
});

describe('InputField', () => {
  test('renders label and input', () => {
    render(<InputField name="username" label="Username" />);
    expect(screen.getByTestId('required-label')).toHaveTextContent('Username');
    expect(screen.getByTestId('input-field')).toBeInTheDocument();
  });

  test('renders error message when errorMessage is string', () => {
    render(
      <InputField name="username" label="Username" errorMessage="Required" />,
    );
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  test('renders error message when errorMessage is array', () => {
    render(
      <InputField
        name="username"
        label="Username"
        errorMessage={['Too short', 'Invalid']}
      />,
    );
    expect(screen.getByText(/too short, invalid/i)).toBeInTheDocument();
  });
});
