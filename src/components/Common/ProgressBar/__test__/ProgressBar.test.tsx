import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from '..';
describe('ProgressBar component', () => {
  test('renders label and total text', () => {
    render(<ProgressBar type="Annual" total={10} />);
    expect(screen.getByText('Annual')).toBeInTheDocument();
    expect(screen.getByText('10 day(s)')).toBeInTheDocument();
  });

  test('uses default color "primary" when no color is provided', () => {
    const { container } = render(<ProgressBar type="Annual" total={4} />);
    const progress = container.querySelector('div > div > div'); // Inner bar
    expect(progress).toHaveStyle('background-color: primary');
  });
});
