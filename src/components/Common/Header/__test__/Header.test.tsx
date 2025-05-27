import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '..';

describe('Header component', () => {
  test('renders the title', () => {
    render(<Header title="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('applies default classes', () => {
    render(<Header title="Dashboard" />);
    const header = screen.getByText('Dashboard');
    expect(header).toHaveClass('text-3xl');
    expect(header).toHaveClass('font-bold');
    expect(header).toHaveClass('text-primary');
  });
});
