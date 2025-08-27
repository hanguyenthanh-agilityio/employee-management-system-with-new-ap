import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextareaField } from '..';
import { RequiredLabelProps } from '@/types/field';

jest.mock('@/components', () => {
  const RequiredLabel = ({
    label,
    htmlFor,
    required,
    className,
  }: RequiredLabelProps) => (
    <label htmlFor={htmlFor} className={className} data-testid="required-label">
      {label}
      {required && <span>*</span>}
    </label>
  );
  RequiredLabel.displayName = 'MockRequiredLabel';

  const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
  >((props, ref) => <textarea ref={ref} {...props} data-testid="textarea" />);
  Textarea.displayName = 'MockTextarea';

  return { RequiredLabel, Textarea };
});
describe('TextareaField', () => {
  test('renders label and textarea', () => {
    render(<TextareaField name="desc" label="Description" />);
    expect(screen.getByTestId('required-label')).toHaveTextContent(
      'Description',
    );
    expect(screen.getByTestId('textarea')).toBeInTheDocument();
  });

  test('renders error message when errorMessage is string', () => {
    render(
      <TextareaField
        name="desc"
        label="Description"
        errorMessage="Field is required"
      />,
    );
    expect(screen.getByText(/field is required/i)).toBeInTheDocument();
  });

  test('renders error message when errorMessage is array', () => {
    render(
      <TextareaField
        name="desc"
        label="Description"
        errorMessage={['Too short', 'Invalid']}
      />,
    );
    expect(screen.getByText(/too short, invalid/i)).toBeInTheDocument();
  });

  test('does not render error message when errorMessage is undefined', () => {
    render(<TextareaField name="desc" label="Description" />);
    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('textarea')).toHaveAttribute(
      'aria-invalid',
      'false',
    );
  });

  it('applies input-error class when errorMessage exists', () => {
    render(
      <TextareaField name="desc" label="Description" errorMessage="Required" />,
    );
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('input-error');
    expect(textarea).not.toHaveClass('input-profile');
  });

  it('applies input-profile class when there is no errorMessage', () => {
    render(<TextareaField name="desc" label="Description" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('input-profile');
    expect(textarea).not.toHaveClass('input-error');
  });
});
