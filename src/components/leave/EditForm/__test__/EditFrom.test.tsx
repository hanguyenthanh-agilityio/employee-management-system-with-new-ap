import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import EditForm from '..';
import { updateLeaveApplication } from '@/api/leaveApplications';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock('@/api/leaveApplications', () => ({
  updateLeaveApplication: jest.fn(),
}));

const leaveMock = {
  documentId: '1',
  startDate: '2025-08-01',
  endDate: '2025-08-03',
  employeeName: 'Ha Nguyen',
  type: 'annual',
  reason: 'Resting',
  durations: 3,
  resumptionDate: '2025-08-04',
  status: '',
  document: {
    id: 1,
    name: '',
    url: '',
  },
};

describe('CreateLeaveContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Render form component', () => {
    render(<EditForm leave={leaveMock} />);

    expect(screen.getByDisplayValue('2025-08-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2025-08-03')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2025-08-04')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Resting')).toBeInTheDocument();
  });

  test.skip('Submit form and redirects on Success', async () => {
    (updateLeaveApplication as jest.Mock).mockResolvedValue({
      success: true,
    });

    render(<EditForm leave={leaveMock} />);

    fireEvent.change(screen.getByLabelText(/reason for leave/i), {
      target: { value: 'Changed' },
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updateLeaveApplication as jest.Mock).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({
          reason: 'Changed',
        }),
      );
    });
  });
});
