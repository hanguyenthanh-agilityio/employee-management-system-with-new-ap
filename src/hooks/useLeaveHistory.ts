import { ChangeEvent, useMemo, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// APIs
import {
  deleteLeaveApplication,
  exportLeaveApplications,
} from '@/api/leaveApplications';

// Utils
import { triggerDownload } from '@/utils/download';

// Types
import { LeaveItem } from '@/types/components';

// Constants
import { ROUTER, ERROR_MESSAGE } from '@/constants';

export const useLeaveHistory = (data: LeaveItem[]) => {
  /**
   * searchParams: get query from URL
   * router: use to change URL
   * pathname: Get current path
   */
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedType = searchParams.get('type') || 'All';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const ITEMS_PER_PAGE = 5;

  const [sortBy, setSortBy] = useState<
    'employeeName' | 'startDate' | 'endDate' | 'type' | ''
  >('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  /**
   * Render data when filter by type
   * memo: avoid re-calculating every render
   */
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (selectedType === 'All') return data;
    return data.filter((item) => item.type === selectedType);
  }, [data, selectedType]);

  const sortedData = useMemo(() => {
    const dataToSort = [...filteredData];
    if (!sortBy) return dataToSort;
    return dataToSort.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  /**
   * Generate a list of leave type form data
   * memo: avoid re-calculating the leave types list
   * set: remove duplicate value
   */
  const leaveTypes = useMemo(() => {
    if (!Array.isArray(data)) return ['All'];
    const uniqueTypes = Array.from(new Set(data.map((item) => item.type)));
    return ['All', ...uniqueTypes];
  }, [data]);
  /**
   * Handle when select new filter
   */
  const handleChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'All') {
      params.delete('type');
    } else {
      params.set('type', type);
    }

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) =>
    handleChange(e.target.value);

  const handleSort = (field: string) => {
    if (
      field === 'employeeName' ||
      field === 'startDate' ||
      field === 'endDate' ||
      field === 'type'
    ) {
      if (sortBy === field) {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(field);
        setSortOrder('asc');
      }
    }
  };

  // Handle edit Leave Application
  const handleEdit = (documentId: string): (() => void) => {
    return () => {
      router.push(`${ROUTER.LEAVE_APPLICATION}/${documentId}${ROUTER.EDIT}`);
    };
  };

  // Handle delete Leave Application
  const handleDelete = (documentId: string): (() => void) => {
    return async () => {
      try {
        await deleteLeaveApplication(documentId);

        router.refresh();
      } catch (error) {
        console.error(ERROR_MESSAGE.DELETE_FAILED, error);
      }
    };
  };

  /**
   * HANDLE EXPORT LEAVE APPLICATIONS
   * Get data blob from server
   * File download trigger
   * Handle error if export fails
   */
  const handleExport = async (format: 'pdf' | 'csv' | 'excel') => {
    try {
      const blob = await exportLeaveApplications(format);
      triggerDownload(blob, `leave_applications.${format}`);
    } catch (error) {
      console.error(ERROR_MESSAGE.EXPORT_FAILED, error);
    }
  };

  return {
    paginatedData,
    currentPage,
    totalPages,
    leaveTypes,
    selectedType,
    sortBy,
    sortOrder,
    handleFilterChange,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleExport,
    handleSort,
  };
};
