import { render, screen } from '@testing-library/react';

// Components
import { ProfileDisplay } from '@/components';

// Constants
import { AVATAR_URL } from '@/constants';

// Mocks
import { mockProfile } from '@/mocks/profile';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('ProfileDisplay component', () => {
  const profile = mockProfile;

  const props = {
    avatarUrl: AVATAR_URL,
    profile,
  };

  test('Renders Avatar with fallback text', () => {
    render(<ProfileDisplay {...props} />);
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  test('Renders ProfileEditForm inside a form element', () => {
    render(<ProfileDisplay {...props} />);
    const form = screen.getByTestId('profile-edit-form');
    expect(form).toBeInTheDocument();
  });

  test('Renders form fields with default values from profile', () => {
    render(<ProfileDisplay {...props} />);
    expect(screen.getByDisplayValue(profile.username)).toBeInTheDocument();
    expect(screen.getByDisplayValue(profile.department)).toBeInTheDocument();
    expect(screen.getByDisplayValue(profile.jobTitle)).toBeInTheDocument();
    expect(screen.getByDisplayValue(profile.jobCategory)).toBeInTheDocument();
  });
});
