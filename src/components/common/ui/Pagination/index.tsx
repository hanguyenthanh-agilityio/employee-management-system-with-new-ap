'use client';

import clsx from 'clsx';
import { useMemo } from 'react';
// spinner icon
import Button from '../Button/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = useMemo(() => {
    if (totalPages <= 1) return [];

    const pages: (number | string)[] = [];
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push('...');

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  if (getPages.length === 0) return null;

  const handleClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="flex justify-center mt-6">
      <ul className="inline-flex items-center space-x-2">
        {/* Previous button */}
        <li>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={clsx(
              'px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border transition',
              'bg-white text-gray-600 hover:bg-gray-100 shadow-sm',
              'dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700',
              currentPage === 1 && 'opacity-50 cursor-not-allowed',
            )}
          >
            Previous
          </Button>
        </li>

        {/* Page numbers */}
        {getPages.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <Button
                onClick={() => handleClick(page)}
                className={clsx(
                  'px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border transition',
                  page === currentPage
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
                  page !== currentPage && 'cursor-pointer',
                )}
              >
                {page}
              </Button>
            ) : (
              <span className="flex items-center px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-400 dark:text-gray-500 select-none">
                ...
              </span>
            )}
          </li>
        ))}

        {/* Next button */}
        <li>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={clsx(
              'px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border transition',
              'bg-white text-gray-600 hover:bg-gray-100 shadow-sm',
              'dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700',
              currentPage === totalPages && 'opacity-50 cursor-not-allowed',
            )}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
