// Icons
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

// Components
import { ActionsDropdown, Button } from '@/components';
import FallbackImage from '@/components/status/ImageFallback';

// Types
import { LeaveItem } from '@/types/components';

// Utils
import { formatName } from '@/utils/format';

type ColumnType = {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
  onEdit: (documentId: string) => () => void;
  onDelete: (documentId: string) => () => void;
};

export const COLUMNS = ({
  sortBy,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}: ColumnType) => [
  {
    title: 'Name(s)',
    render: (row: LeaveItem) =>
      formatName(
        row.users_permissions_user?.username || row.employeeName || '',
      ),
  },
  {
    title: 'Duration(s)',
    render: (row: LeaveItem) => row.durations,
  },
  {
    title: (
      <Button
        className="w-full flex justify-center gap-2 bg-transparent shadow-none hover:bg-transparent hover:outline-none hover:border-none font-bold !text-lg"
        onClick={() => onSort('startDate')}
      >
        Start Date
        {sortBy === 'startDate' ? (
          sortOrder === 'asc' ? (
            <ChevronDownIcon width={12} height={12} />
          ) : (
            <ChevronUpIcon width={12} height={12} />
          )
        ) : (
          ''
        )}
      </Button>
    ),
    render: (row: LeaveItem) => row.startDate,
  },
  {
    title: (
      <Button
        className="w-full flex justify-center gap-2 bg-transparent shadow-none hover:bg-transparent hover:outline-none hover:border-none font-bold !text-lg"
        onClick={() => onSort('endDate')}
      >
        End Date
        {sortBy === 'endDate' ? (
          sortOrder === 'asc' ? (
            <ChevronDownIcon width={12} height={12} />
          ) : (
            <ChevronUpIcon width={12} height={12} />
          )
        ) : (
          ''
        )}
      </Button>
    ),
    render: (row: LeaveItem) => row.endDate,
  },
  {
    title: (
      <Button
        className="w-full flex justify-center gap-2 bg-transparent shadow-none hover:bg-transparent hover:outline-none hover:border-none font-bold !text-lg"
        onClick={() => onSort('type')}
      >
        Type
        {sortBy === 'type' ? (
          sortOrder === 'asc' ? (
            <ChevronDownIcon width={12} height={12} />
          ) : (
            <ChevronUpIcon width={12} height={12} />
          )
        ) : (
          ''
        )}
      </Button>
    ),
    render: (row: LeaveItem) => row.type,
  },
  {
    title: 'Document',
    render: (row: LeaveItem) => (
      <div className="flex justify-center">
        {row.document ? (
          <div className="w-[40px] h-[40px] flex items-center justify-center">
            <FallbackImage
              src={`${process.env.NEXT_PUBLIC_API_URL}${row.document.url}`}
              alt={row.document.name || 'Document'}
              size={40}
            />
          </div>
        ) : (
          <div className="w-[40px] h-[40px] flex items-center justify-center text-gray-400 text-sm">
            –
          </div>
        )}
      </div>
    ),
  },
  {
    title: 'Reason(s)',
    render: (row: LeaveItem) => row.reason,
    className: ' truncate max-w-40',
  },
  {
    title: 'Actions',
    render: (row: LeaveItem) => (
      <div className="flex items-center justify-center h-full">
        <ActionsDropdown
          onEdit={onEdit(row.documentId)}
          onDelete={onDelete(row.documentId)}
        />
      </div>
    ),
  },
];
