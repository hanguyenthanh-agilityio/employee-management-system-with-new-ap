'use client';

import { useState, useRef } from 'react';
import { ROUTER } from '@/constants';

import Link from 'next/link';

// Icons
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/outline';

// Hooks
import { useClickOutside } from '@/hooks/useClickOutside';
import { Loading, Logout } from '@/icons';

interface ProfileDropdownProps {
  isLoading: boolean;
  onClick: () => void;
}

const ProfileDropdown = ({ isLoading, onClick }: ProfileDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className="w-9 h-9 rounded-full bg-yellow flex items-center justify-center shadow-lg"
        onClick={handleClick}
        aria-label="profile"
      >
        <UserCircleIcon className="w-6 h-6 text-white" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <Link
                href={ROUTER.EDIT_PERSONAL_DETAILS}
                className="flex items-center block px-4 py-2 hover:bg-gray-100"
              >
                <UserIcon className="w-6 h-6 mr-2" />
                Account
              </Link>
            </li>
            <li className={`flex justify-center ${isLoading && 'py-2'}`}>
              {isLoading ? (
                <Loading width={8} height={8} />
              ) : (
                <button
                  className="flex items-center w-full block px-4 py-2 hover:bg-gray-100"
                  onClick={onClick}
                >
                  <Logout /> Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
