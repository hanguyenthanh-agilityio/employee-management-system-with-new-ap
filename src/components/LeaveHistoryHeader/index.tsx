import { ChangeEvent } from 'react';

// Components
import { Select, ExportDropdown } from '@/components';

interface LeaveHistoryHeaderProps {
  leaveTypes: string[];
  selectedType: string;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onExport: (format: 'pdf' | 'csv' | 'excel') => void;
}

const LeaveHistoryHeader = ({
  leaveTypes,
  selectedType,
  onFilterChange,
  onExport,
}: LeaveHistoryHeaderProps) => {
  return (
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
          onChange={onFilterChange}
          className="flex items-center justify-center text-lg min-w-[180px]"
          options={leaveTypes.map((type) => ({
            value: type,
            label: type,
          }))}
        />

        {/* Dropdown Export file */}
        <ExportDropdown onExport={onExport} />
      </div>
    </div>
  );
};

export default LeaveHistoryHeader;
