'use client';

// Components
import { GenericTable, LeaveHistoryHeader } from '@/components';

// Types
import { LeaveItem } from '@/types/components';

// Constants
import { columns } from '@/constants';

// Hooks
import { useLeaveHistory } from '@/hooks/useLeaveHistory';

const LeaveHistorySection = ({ data }: { data: LeaveItem[] }) => {
  const {
    paginatedData,
    currentPage,
    totalPages,
    leaveTypes,
    selectedType,
    sortBy,
    sortOrder,
    handleSort,
    handleFilterChange,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleExport,
  } = useLeaveHistory(data);

  return (
    <>
      {/* Leave History header */}
      <LeaveHistoryHeader
        leaveTypes={leaveTypes}
        selectedType={selectedType}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
      />

      {/* Leave History table */}
      <GenericTable
        data={paginatedData}
        columns={columns({
          sortBy,
          sortOrder,
          onSort: handleSort,
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
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
