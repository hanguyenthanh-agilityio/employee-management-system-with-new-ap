import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from '..';

describe('Dropdown component', () => {
  const actions = [
    { label: 'Edit', onClick: jest.fn() },
    { label: 'Delete', onClick: jest.fn(), textClass: 'text-red-500' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders button with default label', () => {
    render(<Dropdown actions={actions} />);
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('renders button with custom label', () => {
    render(<Dropdown actions={actions} buttonLabel="Options" />);
    expect(screen.getByText('Options')).toBeInTheDocument();
  });

  test('opens dropdown on button click', () => {
    render(<Dropdown actions={actions} />);
    fireEvent.click(screen.getByText('Actions'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('calls onClick and closes dropdown when action is clicked', () => {
    render(<Dropdown actions={actions} />);
    fireEvent.click(screen.getByText('Actions'));

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(actions[0].onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('applies custom textClass to action', () => {
    render(<Dropdown actions={actions} />);
    fireEvent.click(screen.getByText('Actions'));

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toHaveClass('text-red-500');
  });
});
