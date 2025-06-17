// Icons
import { ArrowDownCircleIcon } from '@heroicons/react/16/solid';

// Components
import { Dropdown } from '@/components';

type Format = 'pdf' | 'csv' | 'excel';

interface ExportDropdownProps {
  onExport: (format: Format) => void;
}

const ExportDropdown = ({ onExport }: ExportDropdownProps) => (
  <Dropdown
    disabled={true}
    buttonLabel="Export"
    buttonClassName="gap-2 rounded-md px-4 py-2 bg-gray-400 cursor-not-allowed opacity-60 text-base shadow-md"
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

export default ExportDropdown;
