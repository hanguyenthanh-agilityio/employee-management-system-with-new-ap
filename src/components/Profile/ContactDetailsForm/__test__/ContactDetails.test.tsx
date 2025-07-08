import { ContactDetailsForm } from '@/components';
import { render, screen } from '@testing-library/react';

describe('ContactDetailsForm', () => {
  test('renders all input fields and button', () => {
    render(<ContactDetailsForm />);

    expect(screen.getByLabelText(/phone number 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city of residence/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/residential address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });
});
