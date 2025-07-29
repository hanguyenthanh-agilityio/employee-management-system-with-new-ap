import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import Avatar from '..';

describe('Avatar component', () => {
  test('renders fallback letter when no src is provided', () => {
    render(<Avatar name="Diana" />);
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  test('renders "?" when name is empty', () => {
    render(<Avatar name="" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
