import { render, screen } from '@testing-library/react';

import { mockContact } from '@/mocks/profile';
import ContactDetailsSection from '..';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('ContactDetailsSection component', () => {
  const contact = mockContact;

  test('Renders ContactDetailsSection inside a form element', () => {
    render(<ContactDetailsSection contact={contact} userId={2} />);
    const form = screen.getByTestId('contact-details-form');

    expect(form).toBeInTheDocument();
  });

  test('Renders from fields with default values from Contact', () => {
    render(<ContactDetailsSection contact={contact} userId={2} />);

    expect(screen.getByDisplayValue(contact.phoneNumber1)).toBeInTheDocument();

    expect(screen.getByDisplayValue(contact.phoneNumber2)).toBeInTheDocument();

    expect(screen.getByDisplayValue(contact.email)).toBeInTheDocument();

    expect(screen.getByDisplayValue(contact.city)).toBeInTheDocument();

    expect(screen.getByDisplayValue(contact.residential)).toBeInTheDocument();
  });
});
