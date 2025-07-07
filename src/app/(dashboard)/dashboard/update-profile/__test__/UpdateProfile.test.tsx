import { render, screen } from '@testing-library/react';

// Page
import UpdateProfilePage from '../page';

jest.mock('@/components', () => ({
  __esModule: true,
  Breadcrumbs: ({ paths }: { paths: string[] }) => (
    <div data-testid="breadcrumbs">{paths.join(' > ')}</div>
  ),
  ProfileSidebar: ({ selected }: { selected: string[] }) => (
    <div data-testid="sidebar">Sidebar: {selected}</div>
  ),
  ProfileDisplay: ({ name }: { name: string }) => (
    <div data-testid="profile-display">Name: {name}</div>
  ),
}));

describe('UpdateProfilePage', () => {
  it('renders breadcrumbs', () => {
    render(<UpdateProfilePage />);
    expect(screen.getByTestId('breadcrumbs')).toHaveTextContent(
      'Dashboard > Update Profile',
    );
  });

  it('renders sidebar with selected section', () => {
    render(<UpdateProfilePage />);
    expect(screen.getByTestId('sidebar')).toHaveTextContent(
      'Sidebar: Personal Details',
    );
  });

  it('renders profile display with user name', () => {
    render(<UpdateProfilePage />);
    expect(screen.getByTestId('profile-display')).toHaveTextContent(
      'Name: Biruk Dawit',
    );
  });
});
