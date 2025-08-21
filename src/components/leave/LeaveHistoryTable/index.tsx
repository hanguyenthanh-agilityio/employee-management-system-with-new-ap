'use client';

import { ReactNode } from 'react';

// Components
import { Pagination } from '@/components';
import clsx from 'clsx';

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
}: GenericTableProps<T>) => (
  <div className="overflow-x-auto w-full pb-20">
    <div className="min-h-[350px] flex flex-col justify-between">
      <table className="min-w-full bg-card rounded-lg shadow-sm text-sm md:text-base text-foreground transition-colors duration-300">
        <thead className="bg-[#e3edf9] dark:bg-[#969696] text-foreground font-bold">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 md:py-5 whitespace-nowrap text-lg"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-muted-foreground"
              >
                No data available.
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="odd:bg-white even:bg-[#e3edf9] dark:odd:bg-[#0a0a0a] dark:even:bg-[#969696] transition-colors h-[60px]"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={clsx(
                      'px-4 py-2 whitespace-nowrap text-center',
                      'h-[60px]',
                      'align-middle',
                      col.className ?? '',
                    )}
                  >
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

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

export default GenericTable;
