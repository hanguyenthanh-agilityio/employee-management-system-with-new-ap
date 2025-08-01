import { Metadata } from 'next';

import { Suspense } from 'react';

// Icons
import { BookOpenIcon } from '@heroicons/react/16/solid';

// Components
import {
  Breadcrumbs,
  LeaveApplicationSection,
  LoadingLeaveApplication,
  LeaveHistoryWrapper,
} from '@/components';
import { BREADCRUMBS } from '@/constants';

export const metadata: Metadata = {
  title: 'Leave Application',
};

const ApplyForLeavePage = async () => {
  return (
    <>
      <Breadcrumbs paths={BREADCRUMBS.LEAVE_APPLICATION} />

      {/* Main content */}
      <div className="bg-white">
        <div className="p-6 md:p-6 lg:p-8">
          <h2 className="flex item-center gap-4 text-2xl md:text-3xl text-[#1D1D1D] px-0 md:px-5 py-4 md:py-6 lg:py-8">
            <BookOpenIcon width={34} height={34} />
            Leave Application
          </h2>
          <LeaveApplicationSection />

          {/* Table Leave History */}
          <Suspense fallback={<LoadingLeaveApplication />}>
            <LeaveHistoryWrapper />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ApplyForLeavePage;
