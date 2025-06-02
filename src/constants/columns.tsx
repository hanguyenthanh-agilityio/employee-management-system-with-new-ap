// Components
import { ActionsDropdown } from '@/components';

// Types
import { LeaveItem } from '@/types/components';

type ColumnType = {
  onEdit: (id: string) => () => void;
  onDelete: (id: string) => () => void;
};

export const columns = ({ onEdit, onDelete }: ColumnType) => [
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
      <ActionsDropdown onEdit={onEdit(row.id)} onDelete={onDelete(row.id)} />
    ),
    className: 'flex justify-center',
  },
];
