import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ValidatedFileInputField from '..';

interface FormValues {
  file: File | null;
}

describe('ValidatedFileInputField', () => {
  const setup = (
    props: Partial<
      React.ComponentProps<typeof ValidatedFileInputField<FormValues>>
    > = {},
  ) => {
    const Wrapper = () => {
      const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: { file: null },
      });

      const onSubmit: SubmitHandler<FormValues> = jest.fn();

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ValidatedFileInputField
            control={control}
            name="file"
            label="Upload File"
            {...props}
          />
          <button type="submit">Submit</button>
        </form>
      );
    };
    return render(<Wrapper />);
  };

  it('renders label and input', () => {
    setup();
    expect(screen.getByLabelText(/Upload File/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload File/i)).toHaveAttribute(
      'type',
      'file',
    );
  });

  it('calls onFileChange when file is selected', () => {
    const handleFileChange = jest.fn();
    setup({ onFileChange: handleFileChange });

    const input = screen.getByLabelText(/Upload File/i) as HTMLInputElement;
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(handleFileChange).toHaveBeenCalledWith(file);
  });

  it('calls onFileChange with null if no file selected', () => {
    const handleFileChange = jest.fn();
    setup({ onFileChange: handleFileChange });

    const input = screen.getByLabelText(/Upload File/i) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [] } });

    expect(handleFileChange).toHaveBeenCalledWith(null);
  });

  it('shows validation error when required and not provided', async () => {
    const Wrapper = () => {
      const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: { file: null },
      });

      const onSubmit: SubmitHandler<FormValues> = jest.fn();

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ValidatedFileInputField
            control={control}
            name="file"
            label="Upload File"
            rules={{ required: 'File is required' }}
          />
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<Wrapper />);
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/File is required/i)).toBeInTheDocument();
    });
  });
});
