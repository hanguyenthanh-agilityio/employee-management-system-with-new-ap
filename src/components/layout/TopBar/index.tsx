'use client';

import { useRef, useState, useTransition } from 'react';
import { cn } from '@/lib/utils';

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

// Hooks
import { useClickOutside } from '@/hooks/useClickOutside';
import { ThemeToggle } from '@/components/themeToggle';

const TopBar = () => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      router.replace(ROUTER.LOGIN);
    });
  };

  const handleClickHamburger = () => setIsMenuOpen(!isMenuOpen);

  const handleClickItem = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Click outside to close
  useClickOutside(menuRef, () => {
    if (isMenuOpen) setIsMenuOpen(false);
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 gap-3">
        {/* Hamburger - mobile left */}
        <div className="lg:hidden mr-2">
          <button
            onClick={handleClickHamburger}
            className="text-gray-700 dark:text-gray-100 focus:outline-none"
            aria-label="hamburger"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Nav (hidden on mobile) */}
        <div className="hidden lg:flex gap-10">
          <TopBarNav />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <ThemeToggle />

          <div className="relative">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <BellIcon className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 text-xs bg-red text-white w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          <div className="relative">
            <div className="w-9 h-9 bg-green-700 rounded-full flex items-center justify-center shadow-lg">
              <EnvelopeIcon className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 text-xs bg-red text-white w-4 h-4 flex items-center justify-center rounded-full">
              1
            </span>
          </div>

          <ProfileDropdown isLoading={isPending} onClick={handleLogout} />
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        ref={menuRef}
        className={cn(
          'absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md z-40 transition-all duration-300 ease-in-out lg:hidden',
          isMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none',
        )}
      >
        <div className="flex flex-col items-start p-4 gap-3 border-t dark:border-gray-700">
          <TopBarNav onClickItem={handleClickItem} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
