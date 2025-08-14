import { screen, render } from '@testing-library/react';
import { ContactsDetailsType, PersonalDetailsType } from '@/types/profile';
import TabPage from '../page';

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
  test('Renders NotFoundMessage when tab is invalid', async () => {
    render(await TabPage({ params: { tab: 'invalid-tab' } }));

    expect(screen.getByText('Tabs not found')).toBeInTheDocument();
  });
});
