import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '..';

// mock next-themes
const setThemeMock = jest.fn();
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: setThemeMock,
  }),
}));

let mockTheme = 'light';

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTheme = 'light';
  });

  test('Renders current theme icon (light)', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();
    // here you could check that SunIcon is in DOM, e.g. by SVG title or aria-hidden
  });

  test('Opens dropdown when clicked', () => {
    render(<ThemeToggle />);
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(screen.getByText(/light/i)).toBeInTheDocument();
    expect(screen.getByText(/dark/i)).toBeInTheDocument();
    expect(screen.getByText(/system/i)).toBeInTheDocument();
  });

  test('Calls setTheme when selecting theme', () => {
    render(<ThemeToggle />);
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    fireEvent.click(screen.getByText(/dark/i));
    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });

  test('Closes when clicking outside', () => {
    render(
      <div>
        <ThemeToggle />
        <div data-testid="outside">outside</div>
      </div>,
    );
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(screen.getByText(/light/i)).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    // dropdown should be gone
    expect(screen.queryByText(/light/i)).not.toBeInTheDocument();
  });
});
