import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from '..';
describe('ProgressBar component', () => {
  test('renders label and current/total text', () => {
    render(<ProgressBar label="Progress" current={3} total={10} />);
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('3 of 10 day(s)')).toBeInTheDocument();
  });

  test('uses default color "primary" when no color is provided', () => {
    const { container } = render(
      <ProgressBar label="Default color" current={2} total={4} />,
    );
    const progress = container.querySelector('div > div > div'); // Inner bar
    expect(progress).toHaveStyle('background-color: primary');
  });
});
