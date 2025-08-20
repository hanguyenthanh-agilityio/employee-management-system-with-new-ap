'use client';

import clsx from 'clsx';
import { useMemo } from 'react';

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

    const pages = [];
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
      <ul className="inline-flex -space-x-px text-base">
        {/* Previous button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={clsx(
              'px-3 sm:px-4 py-2 text-sm sm:text-base transition-colors duration-200 border bg-white text-gray-500 hover:bg-gray-100',
              'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700',
              'rounded-l-lg',
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer',
            )}
          >
            Previous
          </button>
        </li>

        {/* Page numbers */}
        {getPages.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => handleClick(page)}
                className={clsx(
                  'px-3 sm:px-4 py-2 text-sm sm:text-base transition-colors duration-200 border',
                  'dark:border-gray-700',
                  page === currentPage
                    ? 'bg-blue-500 text-white dark:bg-blue-600 dark:text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
                  page !== currentPage && 'cursor-pointer',
                )}
              >
                {page}
              </button>
            ) : (
              <span className="flex items-center px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-400 border border-gray-300 bg-white select-none">
                ...
              </span>
            )}
          </li>
        ))}

        {/* Next button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={clsx(
              'px-3 sm:px-4 py-2 text-sm sm:text-base transition-colors duration-200 border border-gray-300 bg-white text-gray-500 hover:bg-gray-100  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
              'rounded-r-lg',
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer',
            )}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
