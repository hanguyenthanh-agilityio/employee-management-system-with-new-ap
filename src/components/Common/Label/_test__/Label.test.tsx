import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Label } from '../label';

describe('Label component', () => {
  test('renders label text', () => {
    render(<Label htmlFor="checkbox">Accept Terms</Label>);
    expect(screen.getByText('Accept Terms')).toBeInTheDocument();
  });

  test('has correct htmlFor attribute', () => {
    render(<Label htmlFor="my-input">Username</Label>);
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'my-input');
  });

  test('applies custom className', () => {
    render(<Label className="text-red-500">Important</Label>);
    expect(screen.getByText('Important')).toHaveClass('text-red-500');
  });
});
