import { render, screen, fireEvent } from '@testing-library/react';
import DeleteConfirmModal from '..';

describe('DeleteConfirmModal', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders when isOpen is true', () => {
    render(
      <DeleteConfirmModal
        isOpen
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isLoading={false}
      />,
    );

    expect(
      screen.getByText(/are you sure you want to delete/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /no, cancel/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /yes, i'm sure/i }),
    ).toBeInTheDocument();
  });

  test('Does not render when isOpen is false', () => {
    const { container } = render(
      <DeleteConfirmModal
        isOpen={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isLoading={false}
      />,
    );

    expect(container.firstChild).toHaveClass('hidden');
  });

  test('Calls onClose when "No, cancel" is clicked', () => {
    render(
      <DeleteConfirmModal
        isOpen
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isLoading={false}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /no, cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('Calls onClose when close (X) button is clicked', () => {
    render(
      <DeleteConfirmModal
        isOpen
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isLoading={false}
      />,
    );

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('Calls onConfirm when confirm button is clicked', () => {
    render(
      <DeleteConfirmModal
        isOpen
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isLoading={false}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /yes, i'm sure/i }));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  test('Disables confirm button and shows loading text when isLoading is true', () => {
    render(
      <DeleteConfirmModal
        isOpen
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isLoading={true}
      />,
    );

    const confirmButton = screen.getByRole('button', { name: /deleting/i });
    expect(confirmButton).toBeDisabled();
    expect(confirmButton).toHaveTextContent('Deleting...');
  });
});
