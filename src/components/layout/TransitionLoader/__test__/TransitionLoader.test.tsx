import { render, screen } from '@testing-library/react';
import TransitionLoader from '..';

describe('TransitionLoader', () => {
  it('renders the loading spinner and screen reader text', () => {
    render(<TransitionLoader />);

    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();

    const srText = screen.getByText(/loading\.\.\./i);
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');
  });
});
