'use client';

import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/16/solid';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 md:p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-haspopup="true"
      >
        {theme === 'light' ? (
          <SunIcon className="w-5 h-5 md:w-6 md:h-6" />
        ) : theme === 'dark' ? (
          <MoonIcon className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <ComputerDesktopIcon className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-900 border rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              setTheme('light');
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Light
          </button>
          <button
            onClick={() => {
              setTheme('dark');
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Dark
          </button>
          <button
            onClick={() => {
              setTheme('system');
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            System
          </button>
        </div>
      )}
    </div>
  );
}
