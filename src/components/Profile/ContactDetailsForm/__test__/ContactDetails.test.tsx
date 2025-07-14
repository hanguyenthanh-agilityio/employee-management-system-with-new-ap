import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';

// Components
import { ContactDetailsForm } from '@/components';

// Mocks
import { mockContact } from '@/mocks/profile';

// Utils
import { ContactDetailsInput } from '@/utils/schemas/updateProfile';

const defaultValues = mockContact;

const Form = () => {
  const form = useForm<ContactDetailsInput>({
    defaultValues,
  });

  return <ContactDetailsForm form={form} />;
};
describe('ContactDetailsForm component', () => {
  test('Renders form with all fields', () => {
    render(<Form />);

    expect(screen.getByLabelText('Phone Number 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number 2')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail Address')).toBeInTheDocument();
    expect(screen.getByLabelText('City of residence')).toBeInTheDocument();
    expect(screen.getByLabelText('Residential Address')).toBeInTheDocument();
  });
});
