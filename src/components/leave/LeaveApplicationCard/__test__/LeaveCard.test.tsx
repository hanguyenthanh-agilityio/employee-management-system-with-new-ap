import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { LeaveCard } from '@/components';

describe('LeaveCard', () => {
  const props = {
    title: 'Annual Leave',
    days: 12,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    props.onClick.mockClear();
  });

  test('Renders leave title and days', () => {
    render(<LeaveCard {...props} />);
    expect(screen.getByText('Annual Leave')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  test('Calls onClick when clicked', () => {
    render(<LeaveCard {...props} />);
    fireEvent.click(screen.getByTestId('leave-card'));
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  test('Calls onClick when pressing Enter or Space key', () => {
    render(<LeaveCard {...props} />);
    const card = screen.getByTestId('leave-card');

    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });
    expect(props.onClick).toHaveBeenCalledTimes(2);
  });
});
