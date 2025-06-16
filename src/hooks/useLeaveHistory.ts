import { ChangeEvent, useMemo, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

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
import { ROUTER, ERROR_MESSAGE, TYPE_LABELS } from '@/constants';

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

  const [isModalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
    if (!Array.isArray(data)) return [{ label: 'All', value: 'All' }];
    const uniqueTypes = Array.from(new Set(data.map((item) => item.type)));
    return [
      { label: 'All', value: 'All' },
      ...uniqueTypes.map((type) => ({
        value: type,
        label: TYPE_LABELS[type] || type,
      })),
    ];
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
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
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
  const handleDelete = (documentId: string) => () => {
    setDeletingId(documentId);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    startTransition(async () => {
      try {
        await deleteLeaveApplication(deletingId);
        setModalOpen(false);
        setDeletingId(null);
        toast.success('Leave application deleted successfully.');
        router.refresh();
      } catch (error) {
        toast.error(ERROR_MESSAGE.DELETE_FAILED);
      }
    });
  };

  const cancelDelete = () => {
    setDeletingId(null);
    setModalOpen(false);
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
    isModalOpen,
    isPending,
    handleFilterChange,
    handlePageChange,
    handleEdit,
    handleDelete,
    confirmDelete,
    cancelDelete,
    handleExport,
    handleSort,
  };
};
