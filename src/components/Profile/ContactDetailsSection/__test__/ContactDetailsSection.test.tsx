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

  test.skip('Renders ContactDetailsSection inside a form element', () => {
    render(<ContactDetailsSection contact={contact} />);
    const form = screen.getByTestId('contact-details-form');

    expect(form).toBeInTheDocument();
  });

  test.skip('Renders from fields with default values from Contact', () => {
    render(<ContactDetailsSection contact={contact} />);

    expect(
      screen.getByDisplayValue(contact.mainPhoneNumber),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue(contact.subPhoneNumber),
    ).toBeInTheDocument();

    expect(screen.getByDisplayValue(contact.email)).toBeInTheDocument();

    expect(screen.getByDisplayValue(contact.city)).toBeInTheDocument();

    expect(screen.getByDisplayValue(contact.residential)).toBeInTheDocument();
  });
});
