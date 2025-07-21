import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { createLeaveApplication } from '@/api/leaveApplications';
import { CreateLeaveContent } from '@/components';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(() => 'annual'),
  }),
}));

jest.mock('@/api/leaveApplications', () => ({
  createLeaveApplication: jest.fn(),
}));
describe('CreateLeaveContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Render from component', () => {
    render(<CreateLeaveContent />);
    expect(screen.getByTestId('leave-form')).toBeInTheDocument();
  });

  test('Rest button clean the form', async () => {
    render(<CreateLeaveContent />);

    const startDate = screen.getByLabelText(/start date/i);
    fireEvent.change(startDate, { target: { value: '2025-07-04' } });

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(startDate).toHaveValue('');
    });
  });

  test('Submit form and redirects on Success', async () => {
    (createLeaveApplication as jest.Mock).mockResolvedValue({
      success: true,
    });

    render(<CreateLeaveContent />);

    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2025-08-01' },
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2025-08-03' },
    });
    fireEvent.change(screen.getByLabelText(/reason for leave/i), {
      target: { value: 'Need rest' },
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createLeaveApplication as jest.Mock).toHaveBeenCalled();
    });
  });
});
