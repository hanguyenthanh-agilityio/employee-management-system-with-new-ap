import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LeaveItem } from '@/types/components';

// Mock useLeaveHistory
jest.mock('@/hooks/useLeaveHistory', () => ({
  useLeaveHistory: jest.fn(),
}));

import { useLeaveHistory } from '@/hooks/useLeaveHistory';
import LeaveHistorySection from '..';

const mockLeaveData: LeaveItem[] = [
  {
    id: '1',
    type: 'Annual Leave',
    startDate: '2025-07-01',
    endDate: '2025-07-05',
    resumptionDate: '2025-07-06',
    durations: 5,
    status: 'pending',
    documentId: '',
    employeeName: '',
    reason: '123',
    document: {
      id: 2,
      name: '',
      url: '',
    },
  },
];

describe('LeaveHistorySection', () => {
  const mockFn = {
    handleSort: jest.fn(),
    handleFilterChange: jest.fn(),
    handlePageChange: jest.fn(),
    handleEdit: jest.fn(),
    handleDelete: jest.fn(),
    confirmDelete: jest.fn(),
    cancelDelete: jest.fn(),
  };

  beforeEach(() => {
    (useLeaveHistory as jest.Mock).mockReturnValue({
      paginatedData: mockLeaveData,
      currentPage: 1,
      totalPages: 1,
      leaveTypes: ['Annual Leave'],
      selectedType: 'Annual Leave',
      sortBy: 'startDate',
      sortOrder: 'asc',
      isModalOpen: false,
      isPending: false,
      ...mockFn,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders leave history section with data', () => {
    render(<LeaveHistorySection data={mockLeaveData} />);
    expect(screen.getByTestId('leave-history')).toBeInTheDocument();
    expect(screen.getByText('Annual Leave')).toBeInTheDocument();
    expect(
      screen.queryByText('No leave requests yet.'),
    ).not.toBeInTheDocument();
  });

  test('Renders empty state message when no data', () => {
    (useLeaveHistory as jest.Mock).mockReturnValueOnce({
      ...mockFn,
      paginatedData: [],
      currentPage: 1,
      totalPages: 1,
      leaveTypes: ['Annual Leave'],
      selectedType: 'Annual Leave',
      sortBy: '',
      sortOrder: '',
      isModalOpen: false,
      isPending: false,
    });

    render(<LeaveHistorySection data={[]} />);
    expect(screen.getByText('No leave requests yet.')).toBeInTheDocument();
  });
});
