import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { ProfileEditForm } from '@/components';

describe('ProfileEditForm component', () => {
  test('renders all input fields and labels', () => {
    render(<ProfileEditForm />);

    expect(screen.getByText('Employee Name')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Job Title')).toBeInTheDocument();
    expect(screen.getByText('Job Category')).toBeInTheDocument();

    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });

  test('renders Save button', () => {
    render(<ProfileEditForm />);
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('allows typing in input fields', () => {
    render(<ProfileEditForm />);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: 'John Doe' } });
    fireEvent.change(inputs[1], { target: { value: 'Full stack' } });

    expect(inputs[0]).toHaveValue('John Doe');
    expect(inputs[1]).toHaveValue('Full stack');
  });
});
