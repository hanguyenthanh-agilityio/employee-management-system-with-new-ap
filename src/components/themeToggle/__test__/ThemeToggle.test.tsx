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

  test('Selects light theme and closes dropdown', () => {
    render(<ThemeToggle />);

    // open dropdown
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/light/i)).toBeInTheDocument();

    // click Light option
    fireEvent.click(screen.getByText(/light/i));

    // assert theme is set to light
    expect(setThemeMock).toHaveBeenCalledWith('light');

    // assert dropdown closes
    expect(screen.queryByText(/light/i)).not.toBeInTheDocument();
  });

  test('Selects light theme and closes dropdown', () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText(/system/i));

    expect(setThemeMock).toHaveBeenCalledWith('system');

    expect(screen.queryByText(/system/i)).not.toBeInTheDocument();
  });
});
