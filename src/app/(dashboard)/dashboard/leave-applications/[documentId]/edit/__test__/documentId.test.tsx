import { fetchLeaveApplicationById } from '@/services/leave/leaveService';
import { render, screen, waitFor } from '@testing-library/react';
import UpdateLeavePage, { generateMetadata } from '../page';
import { LeaveItem } from '@/types/components';

// Mocks
jest.mock('@/services/leave/leaveService', () => ({
  fetchLeaveApplicationById: jest.fn(),
}));

jest.mock('@/components', () => ({
  Breadcrumbs: () => <div data-testid="breadcrumbs" />,
  EditForm: ({ leave }: { leave: LeaveItem }) => (
    <div data-testid="edit-form">{leave?.type}</div>
  ),
  LoadingFormLeave: () => <div data-testid="loading-form" />,
}));

describe('generateMetadata', () => {
  test('Should return metadata with leave type and dates', async () => {
    (fetchLeaveApplicationById as jest.Mock).mockResolvedValue({
      data: {
        type: 'Sick Leave',
        startDate: '2025-07-20',
        endDate: '2025-07-22',
      },
    });

    const metadata = await generateMetadata({
      params: { documentId: 'abc123' },
    });

    expect(metadata).toEqual({
      title: 'Update Leave - Sick Leave',
      description: 'Edit leave request from 2025-07-20 to 2025-07-22.',
    });
  });
});

describe('UpdateLeavePage', () => {
  const mockLeaveApplication = {
    data: {
      id: '123',
      type: 'Annual Leave',
      startDate: '2025-08-01',
      endDate: '2025-08-03',
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (fetchLeaveApplicationById as jest.Mock).mockResolvedValue(
      mockLeaveApplication,
    );
  });

  test('Renders breadcrumbs, title, and form correctly', async () => {
    render(
      await UpdateLeavePage({ params: Promise.resolve({ documentId: '123' }) }),
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Leave Application')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Fill the required fields below to apply for leave.'),
    ).toBeInTheDocument();
  });

  test('Renders not found if application does not exist', async () => {
    (fetchLeaveApplicationById as jest.Mock).mockResolvedValueOnce(null);

    render(
      await UpdateLeavePage({ params: Promise.resolve({ documentId: '123' }) }),
    );
  });
});
