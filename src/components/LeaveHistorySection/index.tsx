'use client';

// Components
import {
  DeleteConfirmModal,
  GenericTable,
  LeaveHistoryHeader,
} from '@/components';

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
    isModalOpen,
    isPending,
    handleSort,
    handleFilterChange,
    handlePageChange,
    handleEdit,
    handleDelete,
    confirmDelete,
    cancelDelete,
    handleExport,
  } = useLeaveHistory(data);

  const hasData = paginatedData && paginatedData.length > 0;

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
      {hasData ? (
        <GenericTable
          data={paginatedData}
          columns={columns({
            sortBy,
            sortOrder,
            onSort: handleSort as (field: string) => void,
            onEdit: handleEdit,
            onDelete: handleDelete,
          })}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: handlePageChange,
          }}
        />
      ) : (
        <div className="text-center py-7 text-red">No leave requests yet.</div>
      )}

      <DeleteConfirmModal
        isOpen={isModalOpen}
        isLoading={isPending}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default LeaveHistorySection;
