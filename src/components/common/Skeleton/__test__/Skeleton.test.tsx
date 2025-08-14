import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skeleton from '..';

describe('Skeleton component', () => {
  test('renders with default class when no customClass is provided', () => {
    render(<Skeleton />);
    const block = screen.getByTestId('skeleton-block');
    expect(block).toBeInTheDocument();
    expect(block).toHaveClass('h-2.5', 'w-48', 'mb-3');
    expect(block).toHaveClass('bg-gray-200', 'rounded-lg');
  });

  test('merges customClass with base classes', () => {
    render(<Skeleton customClass="h-6 w-64 bg-red-500" />);
    const block = screen.getByTestId('skeleton-block');
    expect(block).toHaveClass('h-6', 'w-64', 'bg-red-500');
    expect(block).toHaveClass('rounded-lg');
    expect(block).not.toHaveClass('bg-gray-200');
  });
});
