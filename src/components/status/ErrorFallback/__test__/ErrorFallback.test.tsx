import { render, screen, fireEvent } from '@testing-library/react';
import ErrorFallback from '..';

describe('ErrorFallback', () => {
  const mockReset = jest.fn();
  const mockError = new Error('Test error');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders error message and button', () => {
    render(<ErrorFallback error={mockError} reset={mockReset} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Something went wrong. Please try again later.',
    );

    expect(
      screen.getByText(/we’re sorry, something went wrong/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /try again/i }),
    ).toBeInTheDocument();
  });

  test('logs error to console', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<ErrorFallback error={mockError} reset={mockReset} />);

    expect(consoleSpy).toHaveBeenCalledWith(mockError);

    consoleSpy.mockRestore();
  });

  test('calls reset function when button is clicked', () => {
    render(<ErrorFallback error={mockError} reset={mockReset} />);

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
