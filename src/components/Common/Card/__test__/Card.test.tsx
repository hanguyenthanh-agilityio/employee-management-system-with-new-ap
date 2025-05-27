import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '..';

describe('Card component', () => {
  test('renders the children inside the card', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
