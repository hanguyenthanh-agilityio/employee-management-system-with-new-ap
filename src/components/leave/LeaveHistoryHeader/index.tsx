import { ChangeEvent } from 'react';

// Components
import { Select } from '@/components';

interface LeaveHistoryHeaderProps {
  leaveTypes: { label: string; value: string }[];
  selectedType: string;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const LeaveHistoryHeader = ({
  leaveTypes,
  selectedType,
  onFilterChange,
}: LeaveHistoryHeaderProps) => (
  <div className="flex flex-col md:flex-row md:justify-between md:items-center px-0 md:px-5 gap-4 pt-8 pb-4 md:pt-10">
    <h3 className="text-2xl md:text-[25px] font-bold text-foreground">
      Leave History
    </h3>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-10">
      {/* Filter by Type */}
      <Select
        data-testid="leave-filter"
        label="Filter by Type:"
        name="type"
        value={selectedType}
        onChange={onFilterChange}
        className="flex items-center justify-center text-lg min-w-[180px]"
        options={leaveTypes}
      />
    </div>
  </div>
);

export default LeaveHistoryHeader;
