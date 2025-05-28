'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

// Components
import {
  GenericTable,
  Select,
  ExportDropdown,
  ActionsDropdown,
} from '@/components';

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

const LeaveHistorySection = ({ data }: { data: LeaveItem[] }) => {
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

  /**
   * Render data when filter by type
   * memo: avoid re-calculating every render
   */
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (selectedType === 'All') return data;
    return data.filter((item) => item.type === selectedType);
  }, [data, selectedType]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

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

  const handleFilterChange = (e: { target: { value: string } }) =>
    handleChange(e.target.value);

  // Handle edit Leave Application
  const handleEdit = (id: string): (() => void) => {
    return () => {
      router.push(`${ROUTER.LEAVE_APPLICATION}/${id}${ROUTER.EDIT}`);
    };
  };

  // Handle delete Leave Application
  const handleDelete = (id: string): (() => void) => {
    return async () => {
      try {
        await deleteLeaveApplication(id);

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

  const columns = [
    {
      title: 'Name(s)',
      render: (row: LeaveItem) => row.employeeName,
    },
    {
      title: 'Duration(s)',
      render: (row: LeaveItem) => row.durations,
    },
    {
      title: 'Start Date',
      render: (row: LeaveItem) => row.startDate,
    },
    {
      title: 'End Date',
      render: (row: LeaveItem) => row.endDate,
    },
    {
      title: 'Type',
      render: (row: LeaveItem) => row.type,
    },
    {
      title: 'Reason(s)',
      render: (row: LeaveItem) => row.reason,
      className: ' truncate max-w-40',
    },
    {
      title: 'Actions',
      render: (row: LeaveItem) => (
        <ActionsDropdown
          onEdit={handleEdit(row.id)}
          onDelete={handleDelete(row.id)}
        />
      ),
      className: 'flex justify-center',
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-0 md:px-5 gap-4 pt-8 pb-4 md:pt-10">
        <h3 className="text-2xl md:text-[25px] font-bold text-black">
          Leave History
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-10">
          {/* Filter by Type */}
          <Select
            label="Filter by Type:"
            name="type"
            value={selectedType}
            onChange={handleFilterChange}
            className="flex items-center justify-center text-lg min-w-[180px]"
            options={leaveTypes.map((type) => ({
              value: type,
              label: type,
            }))}
          />

          {/* Dropdown Export file */}
          <ExportDropdown onExport={handleExport} />
        </div>
      </div>

      {/* Leave History table */}
      <GenericTable
        data={paginatedData}
        columns={columns}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
        }}
      />
    </>
  );
};

export default LeaveHistorySection;
