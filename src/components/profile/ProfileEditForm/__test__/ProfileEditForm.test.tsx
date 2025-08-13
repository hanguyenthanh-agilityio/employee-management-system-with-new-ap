import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SubmitHandler, useForm } from 'react-hook-form';

// Components
import { ProfileEditForm } from '@/components';

// Utils
import {
  personalDetails,
  PersonalDetailsInput,
} from '@/utils/schemas/updateProfile';

// Mocks
import { zodResolver } from '@hookform/resolvers/zod';

const Form = ({ disable = false }: { disable?: boolean }) => {
  const form = useForm<PersonalDetailsInput>({
    resolver: zodResolver(personalDetails),
    defaultValues: {
      username: '',
      department: '',
      jobTitle: '',
      jobCategory: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<PersonalDetailsInput> = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ProfileEditForm form={form} disable={disable} />
    </form>
  );
};

describe('ProfileEditForm component', () => {
  test('Renders form with all fields', () => {
    render(<Form />);

    expect(screen.getByText('Employee Name')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Job Title')).toBeInTheDocument();
    expect(screen.getByText('Job Category')).toBeInTheDocument();
  });

  test('Save button is rendered and disabled when form is not dirty', () => {
    render(<Form />);
    const button = screen.getByRole('button', { name: /save/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('Enables Save button when form is dirty', async () => {
    render(<Form />);
    const usernameInput = screen.getByLabelText(/employee name/i);

    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
    });
  });

  test('Uses "input-profile" class when no error', () => {
    render(<Form />);
    const usernameInput = screen.getByLabelText(/employee name/i);
    expect(usernameInput).toHaveClass('input-profile');
  });
});
