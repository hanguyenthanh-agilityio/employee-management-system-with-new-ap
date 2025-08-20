import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Textarea } from '../textarea';

describe('Textarea component', () => {
  test('renders correctly with placeholder', () => {
    render(<Textarea placeholder="Write here..." />);
    const textarea = screen.getByPlaceholderText('Write here...');
    expect(textarea).toBeInTheDocument();
  });

  test('displays error message when `error` prop is passed', () => {
    render(<Textarea error="Field is required" />);
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });

  test('disables textarea when `disabled` prop is true', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });
});
