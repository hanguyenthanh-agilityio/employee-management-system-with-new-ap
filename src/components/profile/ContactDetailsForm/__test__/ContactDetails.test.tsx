import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import ContactDetailsForm from '..';
import { ContactDetailsInput } from '@/utils/schemas/updateProfile';

// Mock components to simplify testing
jest.mock('@/components', () => ({
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{props.children}</button>
  ),
  Input: (
    props: React.InputHTMLAttributes<HTMLInputElement> & { id: string },
  ) => <input data-testid={props.id} {...props} />,
  Textarea: (
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string },
  ) => <textarea data-testid={props.id} {...props} />,
  RequiredLabel: (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props}>{props.children}</label>
  ),
}));

jest.mock('@/components/common/MaskedInput', () => {
  const MockMaskedInput = (
    props: React.InputHTMLAttributes<HTMLInputElement> & { id: string },
  ) => <input data-testid={props.id} {...props} />;
  MockMaskedInput.displayName = 'MockMaskedInput';
  return MockMaskedInput;
});
describe('ContactDetailsForm', () => {
  const Wrapper = ({ disable = false }: { disable?: boolean }) => {
    const form = useForm<ContactDetailsInput>({
      defaultValues: {
        mainPhoneNumber: '',
        subPhoneNumber: '',
        email: '',
        city: '',
        residential: '',
      },
    });
    return <ContactDetailsForm form={form} disable={disable} />;
  };

  test('renders all required form fields', () => {
    render(<Wrapper />);

    expect(screen.getByTestId('mainPhoneNumber')).toBeInTheDocument();
    expect(screen.getByTestId('subPhoneNumber')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('city')).toBeInTheDocument();
    expect(screen.getByTestId('residential')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  test('disables fields when disable prop is true', () => {
    render(<Wrapper disable />);

    expect(screen.getByTestId('mainPhoneNumber')).toBeDisabled();
    expect(screen.getByTestId('subPhoneNumber')).toBeDisabled();
    expect(screen.getByTestId('email')).toBeDisabled();
    expect(screen.getByTestId('city')).toBeDisabled();
    expect(screen.getByTestId('residential')).toBeDisabled();
  });
});
