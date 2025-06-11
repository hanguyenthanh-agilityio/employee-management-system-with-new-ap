// Icons
import { ArrowDownCircleIcon } from '@heroicons/react/16/solid';

// Components
import { Dropdown } from '@/components';

type Format = 'pdf' | 'csv' | 'excel';

interface ExportDropdownProps {
  onExport: (format: Format) => void;
}

const ExportDropdown = ({ onExport }: ExportDropdownProps) => {
  return (
    <Dropdown
      disabled={true}
      buttonLabel="Export"
      buttonClassName="gap-2 rounded-md px-4 py-2 cursor-no-drop bg-green-700 text-white hover:bg-green-800 text-base shadow-md"
      icon={<ArrowDownCircleIcon width={19} height={19} />}
      actions={[
        {
          label: 'Export PDF',
          onClick: () => onExport('pdf'),
        },
        {
          label: 'Export CSV',
          onClick: () => onExport('csv'),
        },
        {
          label: 'Export Excel',
          onClick: () => onExport('excel'),
        },
      ]}
    />
  );
};

export default ExportDropdown;
