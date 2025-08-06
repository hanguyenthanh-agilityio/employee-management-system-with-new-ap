import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { mockContact } from '@/mocks/profile';
import ContactDetailsSection from '..';
import { ContactsDetailsType } from '@/types/profile';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockUpdate = jest.fn();
jest.mock('@/hooks/useProfile', () => ({
  useUpdateProfile: () => ({
    update: mockUpdate,
    isPending: false,
    errorMessage: '',
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
  test.skip('Submits form and calls update function on success', async () => {
    mockUpdate.mockResolvedValueOnce({ success: true });

    render(<ContactDetailsSection contact={contact} />);

    const form = screen.getByTestId('contact-details-form');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith(
        expect.any(Object),
        String(contact.id),
      );
    });
  });

  test.skip('Falls back to empty string for nullish contact fields', () => {
    const incompleteContact: Partial<ContactsDetailsType> = {
      id: 1,
      mainPhoneNumber: undefined,
      subPhoneNumber: undefined,
      email: undefined,
      city: undefined,
      residential: undefined,
    };

    render(
      <ContactDetailsSection
        contact={incompleteContact as ContactsDetailsType}
      />,
    );

    expect(screen.getAllByDisplayValue('')).toHaveLength(5); // All fields fallback to ''
  });
});
