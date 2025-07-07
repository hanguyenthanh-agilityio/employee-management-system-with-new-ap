import { render, screen } from '@testing-library/react';

// Components
import { ProfileEditForm } from '@/components';

// Constants
import { AVATAR_URL } from '@/constants';

describe('ProfileEditForm component', () => {
  const mockProfile = {
    name: 'Biruk Dawit',
    department: 'Design & Marketing',
    jobTitle: 'UI / UX Designer',
    jobCategory: 'Full time',
    avatarUrl: AVATAR_URL,
  };

  test('renders form with all fields', () => {
    render(<ProfileEditForm profile={mockProfile} />);

    expect(screen.getByText('Employee Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Biruk Dawit')).toBeInTheDocument();

    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Design & Marketing')).toBeInTheDocument();

    expect(screen.getByText('Job Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('UI / UX Designer')).toBeInTheDocument();

    expect(screen.getByText('Job Category')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Full time')).toBeInTheDocument();
  });

  test('renders Save button', () => {
    render(<ProfileEditForm profile={mockProfile} />);
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});
