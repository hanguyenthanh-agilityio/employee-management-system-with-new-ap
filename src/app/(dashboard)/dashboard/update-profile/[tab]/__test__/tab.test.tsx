import { screen, render, waitFor, act } from '@testing-library/react';
import { ContactsDetailsType, PersonalDetailsType } from '@/types/profile';
import TabPage, { generateMetadata } from '../page';
import { TAB_ITEM } from '@/constants';
import { Suspense } from 'react';

jest.mock('@/services/user/userService', () => ({
  getCurrentUser: jest.fn().mockResolvedValue({
    username: 'John Doe',
    email: 'john@example.com',
  }),
}));

jest.mock('@/components', () => ({
  LoadingFormLeave: () => <div data-testid="loading" />,
  NotFoundMessage: ({ title }: { title: string }) => <div>{title}</div>,
  ProfileDisplay: ({ profile }: { profile: PersonalDetailsType }) => (
    <div data-testid="profile">{profile.username}</div>
  ),
  ContactDetailsSection: ({ contact }: { contact: ContactsDetailsType }) => (
    <div data-testid="contact">{contact.email}</div>
  ),
}));

describe('TabPage', () => {
  const renderWithSuspense = async (tab: string) => {
    await act(async () => {
      render(
        <Suspense fallback={<div data-testid="loading" />}>
          <TabPage params={{ tab }} />
        </Suspense>,
      );
    });
  };
  test('renders NotFoundMessage for invalid tab', async () => {
    render(await TabPage({ params: { tab: 'invalid' } }));
    expect(screen.getByText('Tabs not found')).toBeInTheDocument();
  });

  test('renders ProfileDisplay for PERSONAL_DETAILS tab', async () => {
    await renderWithSuspense(TAB_ITEM.PERSONAL_DETAILS);

    await waitFor(() => {
      expect(screen.getByTestId('profile')).toHaveTextContent('John Doe');
    });
  });

  test('renders ContactDetailsSection for CONTACT_DETAILS tab', async () => {
    await renderWithSuspense(TAB_ITEM.CONTACT_DETAILS);

    await waitFor(() => {
      expect(screen.getByTestId('contact')).toHaveTextContent(
        'john@example.com',
      );
    });
  });

  test('returns correct metadata for PERSONAL_DETAILS tab', async () => {
    const result = await generateMetadata({
      params: { tab: TAB_ITEM.PERSONAL_DETAILS },
    });
    expect(result).toEqual({
      title: 'Profile - Personal Details',
      describe: 'View and edit personal details',
    });
  });

  test('returns correct metadata for CONTACT_DETAILS tab', async () => {
    const result = await generateMetadata({
      params: { tab: TAB_ITEM.CONTACT_DETAILS },
    });
    expect(result).toEqual({
      title: 'Profile - Contact Details',
      describe: 'View and edit contact details',
    });
  });

  test('returns correct metadata for invalid tab', async () => {
    const result = await generateMetadata({ params: { tab: 'invalid' } });
    expect(result).toEqual({
      title: 'Profile - Not found',
      describe: 'The tab was not found',
    });
  });
});
