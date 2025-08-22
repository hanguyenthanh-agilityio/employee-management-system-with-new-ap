/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { MaskedInputField } from '..';

// Mock MaskedInput
jest.mock('../../../inputs/MaskedInput', () => {
  const MockedMaskedInput = React.forwardRef<HTMLInputElement, any>(
    (props, ref) => {
      return <input ref={ref} {...props} />;
    },
  );
  MockedMaskedInput.displayName = 'MaskedInput';
  return MockedMaskedInput;
});
// Mock RequiredLabel
jest.mock('@/components', () => ({
  RequiredLabel: ({ label, htmlFor }: { label: string; htmlFor: string }) => (
    <label htmlFor={htmlFor}>{label}</label>
  ),
}));

describe('MaskedInputField', () => {
  test('renders label and input', () => {
    render(<MaskedInputField name="phone" label="Phone" mask="999-999" />);

    const label = screen.getByText('Phone');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'phone');

    const input = screen.getByLabelText('Phone') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'phone');
    expect(input).toHaveAttribute('id', 'phone');
  });

  test('renders required indicator', () => {
    render(
      <MaskedInputField name="phone" label="Phone" mask="999-999" required />,
    );
    const label = screen.getByText('Phone');
    expect(label).toBeInTheDocument();
    // Optional: check for required class or * if implemented
  });

  test('renders error message as string', () => {
    render(
      <MaskedInputField
        name="phone"
        label="Phone"
        mask="999-999"
        errorMessage="Invalid number"
      />,
    );
    const error = screen.getByText('Invalid number');
    expect(error).toBeInTheDocument();

    const input = screen.getByLabelText('Phone');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('input-error');
  });

  test('renders error message as array', () => {
    render(
      <MaskedInputField
        name="phone"
        label="Phone"
        mask="999-999"
        errorMessage={['Invalid number', 'Required']}
      />,
    );
    const error = screen.getByText('Invalid number, Required');
    expect(error).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    const handleChange = jest.fn();
    render(
      <MaskedInputField
        name="phone"
        label="Phone"
        mask="999-999"
        onChange={handleChange}
      />,
    );

    const input = screen.getByLabelText('Phone') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '123-456' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
