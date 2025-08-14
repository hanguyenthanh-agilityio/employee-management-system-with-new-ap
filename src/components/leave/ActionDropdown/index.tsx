import { Dropdown } from '@/components';

type LeaveActionsDropdownProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionsDropdown = ({ onEdit, onDelete }: LeaveActionsDropdownProps) => (
  <Dropdown
    buttonClassName="rounded-lg gap-2 bg-primary dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold px-6 py-2 text-sm hover:bg-blue-800 transition-all duration-200 ease-in-out"
    actions={[
      {
        label: 'Edit',
        onClick: onEdit,
        textClass: 'text-blue-600',
      },
      {
        label: 'Delete',
        onClick: onDelete,
        textClass: 'text-red',
      },
    ]}
  />
);

export default ActionsDropdown;
