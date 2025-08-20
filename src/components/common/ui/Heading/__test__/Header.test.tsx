import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Heading from '..';

describe('Header component', () => {
  test('renders the title', () => {
    render(<Heading title="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('applies default classes', () => {
    render(<Heading title="Dashboard" />);
    const header = screen.getByText('Dashboard');
    expect(header).toHaveClass('text-3xl');
    expect(header).toHaveClass('font-bold');
    expect(header).toHaveClass('text-primary');
  });
});
