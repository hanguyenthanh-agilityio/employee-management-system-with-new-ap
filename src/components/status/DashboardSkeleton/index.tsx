'use client';

import { Skeleton } from '@/components';

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-12 lg:px-8 animate-pulse">
      {/* Header */}
      <Skeleton customClass="h-6 w-48" />

      {/* Profile Card */}
      <div className="h-32 md:h-40 bg-blue-200 rounded-xl w-full" />

      {/* 3 Sections grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave section */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <Skeleton customClass="h-6 w-40 mb-4" />
          <Skeleton customClass="h-4 w-full mb-2" />
          <Skeleton customClass="h-4 w-2/3" />
        </div>

        {/* Birthday section */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <Skeleton customClass="h-6 w-40 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} customClass="h-4 w-full" />
            ))}
          </div>
        </div>

        {/* Payslip section */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-md">
          <Skeleton customClass="h-6 w-60 mb-4" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} customClass="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
