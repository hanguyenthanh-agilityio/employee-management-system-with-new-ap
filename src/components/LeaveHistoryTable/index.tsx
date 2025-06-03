'use client';

import { ReactNode } from 'react';

// Components
import { Pagination } from '@/components';

interface Column<T> {
  title: string | ReactNode;
  render: (item: T) => ReactNode;
  className?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination?: PaginationProps;
}

const GenericTable = <T,>({
  data,
  columns,
  pagination,
}: GenericTableProps<T>) => {
  return (
    <div className="overflow-x-auto w-full pb-24">
      <table className="min-w-full bg-white rounded-lg shadow-sm text-sm md:text-base">
        <thead className="bg-[#E3EDF9] text-black font-bold">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-5 whitespace-nowrap">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-white even:bg-[#E3EDF9]">
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-2 whitespace-nowrap text-center ${col.className ?? ''}`}
                >
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="mt-4">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default GenericTable;
