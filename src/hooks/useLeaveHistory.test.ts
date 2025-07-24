import { act, renderHook } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLeaveHistory } from './useLeaveHistory';
import { LeaveItem } from '@/types/components';
import { deleteLeaveApplication } from '@/api/leaveApplications';
import { toast } from 'react-toastify';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/api/leaveApplications', () => ({
  deleteLeaveApplication: jest.fn(),
}));

describe('useUpdateProfile', () => {
  const push = jest.fn();
  const refresh = jest.fn();

  // SearchParam
  const mockParams = new URLSearchParams({ type: 'All', page: '1' });
  (useSearchParams as jest.Mock).mockReturnValue(mockParams);

  // useRouter
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
    refresh: jest.fn(),
  });

  // usePathname
  (usePathname as jest.Mock).mockReturnValue('/leave-application');

  const mockData: LeaveItem[] = [
    {
      id: '1',
      documentId: '',
      employeeName: '',
      reason: 'Test',
      type: 'Annual Leave',
      startDate: '2025-07-01',
      endDate: '2025-07-02',
      durations: 2,
      resumptionDate: '2025-07-03',
      status: 'Approved',
      document: {
        id: 2,
        name: '',
        url: '',
      },
    },
  ];

  test('Filter and pagination data correctly', () => {
    const { result } = renderHook(() => useLeaveHistory(mockData));

    expect(result.current.paginatedData.length).toBe(1);
    expect(result.current.leaveTypes).toEqual([
      { label: 'All', value: 'All' },
      { label: 'Annual Leave', value: 'Annual Leave' },
    ]);
  });

  test('Call Delete and refresh router', async () => {
    (deleteLeaveApplication as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useLeaveHistory(mockData));

    act(() => {
      result.current.handleDelete('1')();
    });

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(deleteLeaveApplication).toHaveBeenCalledWith('1');

    expect(toast.success).toHaveBeenCalled();
  });
});
