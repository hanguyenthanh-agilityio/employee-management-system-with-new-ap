import { Dropdown } from '@/components';

type LeaveActionsDropdownProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionsDropdown = ({ onEdit, onDelete }: LeaveActionsDropdownProps) => {
  return (
    <Dropdown
      buttonClassName="rounded-lg gap-2 bg-primary text-white font-bold px-6 py-2 text-sm hover:bg-blue-800 transition-all duration-200 ease-in-out"
      actions={[
        {
          label: 'Edit',
          onClick: onEdit,
          textClass: 'text-blue-600',
        },
        {
          label: 'Delete',
          onClick: onDelete,
          textClass: 'text-red-600',
        },
      ]}
    />
  );
};

export default ActionsDropdown;
