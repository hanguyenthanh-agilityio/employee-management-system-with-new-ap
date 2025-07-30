import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import Button from '../button';

describe('Button', () => {
  test('Renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  test('Applies custom className', () => {
    render(<Button className="custom-class">Click</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  test('Renders different variants', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive');
  });

  test('Renders different sizes', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-10');
  });

  test('Handles click events', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('Is disabled when `disabled` prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('Renders using `asChild` with a custom component', () => {
    render(
      <Button asChild>
        <a href="/test" data-testid="as-child-link">
          Go to test
        </a>
      </Button>,
    );

    const link = screen.getByTestId('as-child-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link.tagName.toLowerCase()).toBe('a');
  });
});
