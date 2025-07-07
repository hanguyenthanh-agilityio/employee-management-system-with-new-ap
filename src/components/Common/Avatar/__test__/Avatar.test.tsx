import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import Avatar from '..';

// Constants
import { AVATAR_URL } from '@/constants';

describe('Avatar component', () => {
  test('renders fallback letter when no src is provided', () => {
    render(<Avatar name="Diana" />);
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  test('renders "?" when name is empty', () => {
    render(<Avatar name="" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  test('renders fallback letter when no src is provided', () => {
    render(<Avatar name="Diana" src={AVATAR_URL} />);
    expect(screen.getByText('D')).toBeInTheDocument();
  });
});
