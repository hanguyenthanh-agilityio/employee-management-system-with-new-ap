'use client';

import { ReactNode, useRef, useState } from 'react';

// Icons
import { ChevronDownIcon } from '@heroicons/react/16/solid';

// Hooks
import { useClickOutside } from '@/hooks/useClickOutside';

interface DropdownAction {
  label: string;
  onClick: () => void;
  textClass?: string;
}

interface Props {
  actions: DropdownAction[];
  buttonLabel?: string;
  buttonClassName?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

const Dropdown = ({
  actions,
  buttonLabel = 'Actions',
  buttonClassName = '',
  icon,
  disabled,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        disabled={disabled}
        onClick={toggleDropdown}
        className={`flex items-center ${buttonClassName}`}
      >
        {buttonLabel}
        {icon || <ChevronDownIcon className="w-4 h-4" />}
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-200 ring-opacity-60 focus:outline-none transition-all duration-200 ease-in-out">
          <div className="p-1 max-h-48 overflow-y-auto rounded-lg">
            {actions.map(({ label, onClick, textClass }) => (
              <button
                key={label}
                onClick={() => {
                  setIsOpen(false);
                  onClick();
                }}
                className={`group flex w-full items-center rounded-lg px-4 py-3 text-sm ${
                  textClass || 'text-gray-800'
                } hover:bg-gray-100 transition-all duration-200 ease-in-out`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
