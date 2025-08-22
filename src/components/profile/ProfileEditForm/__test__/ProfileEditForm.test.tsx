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
import { profileFormFields } from '@/constants/inputField';

// Form wrapper
const Form = ({
  fields = profileFormFields,
}: {
  fields?: typeof profileFormFields;
}) => {
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
      <ProfileEditForm form={form} fields={fields} />
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

  test('Shows loading state when submitting', async () => {
    render(<Form />);
    const usernameInput = screen.getByLabelText(/employee name/i);
    fireEvent.change(usernameInput, { target: { value: 'Ha Nguyen' } });

    const button = screen.getByRole('button', { name: /save/i });

    // Wait for Button enable
    await waitFor(() => expect(button).toBeEnabled());

    fireEvent.click(button);

    // Wait for Saving status appear
    await waitFor(() => {
      expect(screen.getByText(/saving/i)).toBeInTheDocument();
    });
  });

  test('Displays TransitionLoader when submitting', async () => {
    render(<Form />);
    const usernameInput = screen.getByLabelText(/employee name/i);
    fireEvent.change(usernameInput, { target: { value: 'Ha Nguyen' } });

    const button = screen.getByRole('button', { name: /save/i });

    // Wait for Button enable
    await waitFor(() => expect(button).toBeEnabled());

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('transition-loader')).toBeInTheDocument();
    });
  });

  test('uses col-span-1 when field.colSpan is undefined', () => {
    render(
      <Form
        fields={[{ name: 'username', label: 'Employee Name', required: false }]}
      />,
    );

    const wrapper = screen.getByText('Employee Name').closest('div');
    expect(wrapper).toHaveClass('w-full flex flex-col gap-1');
  });
});
