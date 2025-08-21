'use client';

import { Skeleton } from '@/components';

const LeaveSectionSkeleton = () => (
  <>
    {/* Leave section */}
    <div className="bg-white rounded-xl p-4 shadow-md">
      <Skeleton customClass="h-6 w-40 mb-4" />
      <Skeleton customClass="h-4 w-full mb-2" />
      <Skeleton customClass="h-4 w-2/3" />
    </div>
  </>
);

export default LeaveSectionSkeleton;
