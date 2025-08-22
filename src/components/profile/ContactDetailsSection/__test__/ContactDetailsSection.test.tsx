import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockContact } from '@/mocks/profile';
import ContactDetailsSection from '..';
import { useUpdateProfile } from '@/hooks/useProfile';
import { toast } from 'react-toastify';

jest.mock('@/hooks/useProfile', () => ({
  useUpdateProfile: jest.fn(),
}));

jest.mock('@/components', () => ({
  ContactDetailsForm: () => (
    <div data-testid="mock-contact-form">Mock Form</div>
  ),
  TransitionLoader: () => <div data-testid="mock-loader">Loading...</div>,
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ContactDetailsSection component', () => {
  const mockUpdate = jest.fn();
  const mockSetErrorMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useUpdateProfile as jest.Mock).mockReturnValue({
      update: mockUpdate,
      errorMessage: '',
      setErrorMessage: mockSetErrorMessage,
    });
  });

  test('renders the form with initial data', () => {
    render(<ContactDetailsSection contact={mockContact} />);
    expect(screen.getByTestId('mock-contact-form')).toBeInTheDocument();
  });

  it('submits form successfully and shows success toast', async () => {
    mockUpdate.mockResolvedValue({ success: true });

    render(<ContactDetailsSection contact={mockContact} />);

    fireEvent.submit(screen.getByTestId('contact-details-form'));

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringContaining('success'),
        expect.any(Object),
      );
    });
  });

  test('shows error toast when update fails', async () => {
    mockUpdate.mockResolvedValue({
      success: false,
      message: 'Update failed',
    });

    render(<ContactDetailsSection contact={mockContact} />);

    fireEvent.submit(screen.getByTestId('contact-details-form'));

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        'Update failed',
        expect.any(Object),
      );
    });

    const onClose = (toast.error as jest.Mock).mock.calls[0][1].onClose;
    expect(onClose).toBeDefined();
    onClose?.();
  });

  test('shows loader when submitting', async () => {
    mockUpdate.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ success: true }), 100),
        ),
    );

    render(<ContactDetailsSection contact={mockContact} />);

    fireEvent.submit(screen.getByTestId('contact-details-form'));

    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled();
    });
  });

  test('shows toast error when errorMessage from hook exists', () => {
    (useUpdateProfile as jest.Mock).mockReturnValueOnce({
      update: mockUpdate,
      errorMessage: 'Hook error',
      setErrorMessage: mockSetErrorMessage,
    });

    render(<ContactDetailsSection contact={mockContact} />);

    expect(toast.error).toHaveBeenCalledWith('Hook error');
    expect(mockSetErrorMessage).toHaveBeenCalledWith('');
  });
});
