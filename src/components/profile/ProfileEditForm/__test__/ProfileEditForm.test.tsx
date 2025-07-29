import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';

// Components
import { ProfileEditForm } from '@/components';

// Utils
import { PersonalDetailsInput } from '@/utils/schemas/updateProfile';

// Mocks
import { mockProfile } from '@/mocks/profile';

const defaultValues = mockProfile;

const Form = () => {
  const form = useForm<PersonalDetailsInput>({
    defaultValues,
  });

  return <ProfileEditForm form={form} />;
};

describe('ProfileEditForm component', () => {
  test('Renders form with all fields', () => {
    render(<Form />);

    expect(screen.getByText('Employee Name')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(defaultValues.username),
    ).toBeInTheDocument();

    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(defaultValues.department),
    ).toBeInTheDocument();

    expect(screen.getByText('Job Title')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(defaultValues.jobTitle),
    ).toBeInTheDocument();

    expect(screen.getByText('Job Category')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(defaultValues.jobCategory),
    ).toBeInTheDocument();
  });
});
