import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from '..';

describe('Checkbox component', () => {
  test('renders label', () => {
    render(<Checkbox id="terms" label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  test('renders subLabel when provided', () => {
    render(<Checkbox id="terms" label="Accept" subLabel="(optional)" />);
    expect(screen.getByText('(optional)')).toBeInTheDocument();
  });

  test('associates label with input via htmlFor and id', () => {
    render(<Checkbox id="my-checkbox" label="Check me" />);
    const checkbox = screen.getByLabelText('Check me');
    expect(checkbox).toHaveAttribute('id', 'my-checkbox');
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox id="cb" label="Label" onChange={handleChange} />);
    const checkbox = screen.getByLabelText('Label');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
