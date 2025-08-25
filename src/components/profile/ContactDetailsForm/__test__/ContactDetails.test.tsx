import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm, UseFormReturn } from 'react-hook-form';
import ContactDetailsForm from '..';
import { ContactDetailsInput } from '@/utils/schemas/updateProfile';
import { FieldConfig } from '@/types/field';

// Mock Button
jest.mock('@/components', () => ({
  __esModule: true,
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{props.children}</button>
  ),
  Input: ({
    id,
    ...rest
  }: React.InputHTMLAttributes<HTMLInputElement> & { id: string }) => (
    <input data-testid={id} {...rest} />
  ),
  Textarea: ({
    id,
    ...rest
  }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string }) => (
    <textarea data-testid={id} {...rest} />
  ),
  RequiredLabel: (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props}>{props.children}</label>
  ),
}));

// Mock MaskedInputField
jest.mock('@/components/common/forms/MaskInputField', () => ({
  __esModule: true,
  MaskedInputField: (
    props: { name: string } & React.InputHTMLAttributes<HTMLInputElement>,
  ) => <input data-testid={props.name} {...props} />,
}));

// Mock TextareaField for HOC
jest.mock('@/components/common/forms/TextareaField', () => ({
  __esModule: true,
  TextareaField: (
    props: { name: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  ) => <textarea data-testid={props.name} {...props} />,
}));

// Mock InputField for HOC
jest.mock('@/components/common/forms/InputField', () => ({
  __esModule: true,
  InputField: (
    props: { name: string } & React.InputHTMLAttributes<HTMLInputElement>,
  ) => <input data-testid={props.name} {...props} />,
}));

// Mock MaskedInput for HOC
jest.mock('@/components/common/inputs/MaskedInput', () => ({
  __esModule: true,
  default: (
    props: { id: string } & React.InputHTMLAttributes<HTMLInputElement>,
  ) => <input data-testid={props.id} {...props} />,
}));

describe('ContactDetailsForm', () => {
  const defaultFields: FieldConfig<ContactDetailsInput>[] = [
    { name: 'mainPhoneNumber', label: 'Main Phone', type: 'masked' },
    { name: 'subPhoneNumber', label: 'Sub Phone', type: 'masked' },
    { name: 'email', label: 'Email', type: 'input' },
    { name: 'city', label: 'City', type: 'input' },
    { name: 'residential', label: 'Residential Address', type: 'textarea' },
  ];

  const Wrapper = ({ disable = false }: { disable?: boolean }) => {
    const form: UseFormReturn<ContactDetailsInput> =
      useForm<ContactDetailsInput>({
        defaultValues: {
          mainPhoneNumber: '',
          subPhoneNumber: '',
          email: '',
          city: '',
          residential: '',
        },
      });

    return (
      <ContactDetailsForm
        form={form}
        fields={defaultFields}
        disable={disable}
      />
    );
  };

  test('renders all form fields and submit button', () => {
    render(<Wrapper />);

    expect(screen.getByTestId('mainPhoneNumber')).toBeInTheDocument();
    expect(screen.getByTestId('subPhoneNumber')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('city')).toBeInTheDocument();
    expect(screen.getByTestId('residential')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  test('disables fields and button when disable prop is true', () => {
    render(<Wrapper disable />);

    expect(screen.getByTestId('mainPhoneNumber')).toBeDisabled();
    expect(screen.getByTestId('subPhoneNumber')).toBeDisabled();
    expect(screen.getByTestId('email')).toBeDisabled();
    expect(screen.getByTestId('city')).toBeDisabled();
    expect(screen.getByTestId('residential')).toBeDisabled();
    expect(screen.getByRole('button', { name: /update/i })).toBeDisabled();
  });
});
