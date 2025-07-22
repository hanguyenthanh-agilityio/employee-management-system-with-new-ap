'use client';

import { useState, useTransition } from 'react';

// Constants
import { useRouter } from 'next/navigation';

// Icons
import {
  BellIcon,
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

// Actions
import { logoutAction } from '@/actions/auth-action';

// Components
import { ROUTER } from '@/constants';

// Components
import { TopBarNav, ProfileDropdown } from '@/components';

const TopBar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      router.replace(ROUTER.LOGIN);
    });
  };

  return (
    <header className="relative max-h-[80px] flex-grow container mx-auto bg-white shadow-sm px-4 py-4 flex items-center justify-between lg:justify-center sm:px-8 sm:py-6">
      <div className="hidden lg:flex gap-12">
        <TopBarNav />
      </div>
      {/* Right Icons */}
      <div className="absolute right-10 flex gap-4 items-center">
        {/* Bell */}
        <div className="relative">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <BellIcon
              role="img"
              aria-label="Notification Bell"
              aria-hidden={false}
              className="w-6 h-6 text-white"
            />
          </div>
          <span className="absolute -top-1 -right-1 text-xs bg-red text-white w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Mail */}
        <div className="relative">
          <div className="w-9 h-9 bg-green-700 rounded-full flex items-center justify-center shadow-lg">
            <EnvelopeIcon
              className="w-5 h-5 text-white"
              role="img"
              aria-label="Envelope"
              aria-hidden={false}
            />
          </div>
          <span className="absolute -top-1 -right-1 text-xs bg-red text-white w-4 h-4 flex items-center justify-center rounded-full">
            1
          </span>
        </div>

        {/* Profile Dropdown */}
        <ProfileDropdown isLoading={isPending} onClick={handleLogout} />
      </div>

      {/* Hamburger for small screens */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md z-10 flex flex-col items-start p-4 lg:hidden gap-3">
          <TopBarNav />
        </div>
      )}
    </header>
  );
};

export default TopBar;
