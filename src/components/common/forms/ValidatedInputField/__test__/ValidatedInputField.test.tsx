/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import ValidatedInputField from '..';
import { InputFieldType } from '@/types/form';

jest.mock('@/components/common/forms/InputField', () => {
  const MockInputField = ({
    label,
    name,
    errorMessage,
    ...props
  }: Omit<
    InputFieldType,
    | 'required'
    | 'containerClassName'
    | 'className'
    | 'labelClassName'
    | 'inputClassName'
  >) => (
    <div data-testid="mock-input-field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...props} />
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );

  MockInputField.displayName = 'MockInputField';

  return { InputField: MockInputField };
});

type FormValues = {
  username: string;
};

const renderWithForm = (rules?: any) => {
  const Wrapper = () => {
    const methods = useForm<FormValues>({
      defaultValues: { username: '' },
    });
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <ValidatedInputField<FormValues>
            control={methods.control}
            name="username"
            label="Username"
            rules={rules}
          />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    );
  };

  return render(<Wrapper />);
};

describe('ValidatedInputField', () => {
  it('renders input with label', () => {
    renderWithForm();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test('accepts user input', () => {
    renderWithForm();
    const input = screen.getByLabelText(/username/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'myname' } });
    expect(input.value).toBe('myname');
  });

  test('shows validation error when required', async () => {
    renderWithForm({ required: 'Username is required' });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() =>
      expect(screen.getByText(/username is required/i)).toBeInTheDocument(),
    );
  });
});
