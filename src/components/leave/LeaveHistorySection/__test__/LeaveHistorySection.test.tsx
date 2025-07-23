'use client';

import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { ConfirmModalType, LeaveItem } from '@/types/components';
import LeaveHistorySection from '..';
import Button from '@/components/common/Button/button';

// Mock DeleteConfirmModal (dynamic import)
jest.mock('@/components/status/DeleteConfirmModal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, onConfirm }: ConfirmModalType) =>
    isOpen ? (
      <div data-testid="delete-modal">
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    ) : null,
}));

// Mock useLeaveHistory hook
jest.mock('@/hooks/useLeaveHistory', () => ({
  useLeaveHistory: (data: LeaveItem[]) => ({
    paginatedData: data,
    currentPage: 1,
    totalPages: 1,
    leaveTypes: ['Annual Leave', 'Sick Leave'],
    selectedType: '',
    sortBy: 'startDate',
    sortOrder: 'asc',
    isModalOpen: true,
    isPending: false,
    handleSort: jest.fn(),
    handleFilterChange: jest.fn(),
    handlePageChange: jest.fn(),
    handleEdit: jest.fn(),
    handleDelete: jest.fn(),
    confirmDelete: jest.fn(),
    cancelDelete: jest.fn(),
  }),
}));

const mockData: LeaveItem[] = [
  {
    documentId: '1',
    startDate: '2025-07-01',
    endDate: '2025-07-03',
    employeeName: 'John Doe',
    type: 'Annual Leave',
    reason: 'Vacation',
    durations: 3,
    status: 'Pending',
    resumptionDate: '2025-07-04',
    document: {
      name: '',
      url: '',
    },
  },
];

describe('LeaveHistorySection', () => {
  test('Renders leave table when data is provided', () => {
    render(<LeaveHistorySection data={mockData} />);

    expect(screen.getByText('Annual Leave')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('Renders empty state when no data', () => {
    render(<LeaveHistorySection data={[]} />);
    expect(screen.getByText('No leave requests yet.')).toBeInTheDocument();
  });

  test('Renders delete modal when isModalOpen is true', () => {
    render(<LeaveHistorySection data={mockData} />);
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('Calls onConfirm and onClose in modal', () => {
    render(<LeaveHistorySection data={mockData} />);

    fireEvent.click(screen.getByText('Confirm'));
    fireEvent.click(screen.getByText('Cancel'));
  });
});
