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
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={clsx(
              'px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100',
              currentPage === 1 && 'opacity-50 cursor-not-allowed',
            )}
          >
            Previous
          </button>
        </li>

        {getPages.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => handleClick(page)}
                className={clsx(
                  'px-3 py-2 leading-tight border border-gray-300',
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-100',
                )}
              >
                {page}
              </button>
            ) : (
              <span className="px-3 py-2 text-gray-400">...</span>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={clsx(
              'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100',
              currentPage === totalPages && 'opacity-50 cursor-not-allowed',
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
