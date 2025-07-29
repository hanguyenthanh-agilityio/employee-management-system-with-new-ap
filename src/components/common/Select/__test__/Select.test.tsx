import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '..';

const options = [
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
];
describe('Select component', () => {
  test('renders label correctly', () => {
    render(<Select label="Action" name="action" options={options} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  test('renders all options', () => {
    render(<Select label="Action" name="action" options={options} />);
    options.forEach((opt) => {
      expect(
        screen.getByRole('option', { name: opt.label }),
      ).toBeInTheDocument();
    });
  });

  test('calls onChange when option is selected', () => {
    const handleChange = jest.fn();
    render(
      <Select
        label="Action"
        name="action"
        options={options}
        onChange={handleChange}
      />,
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'delete' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
