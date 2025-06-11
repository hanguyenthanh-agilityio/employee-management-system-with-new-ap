import { Suspense } from 'react';

// Icons
import { BookOpenIcon } from '@heroicons/react/16/solid';

// APIs
import {
  fetchLeaveApplications,
  getAuthenticatedUserId,
} from '@/api/leaveApplications';

// Types
import { LeaveItem } from '@/types/components';
import {
  Breadcrumbs,
  LeaveApplicationSection,
  LeaveHistorySection,
} from '@/components';

// Components

const ApplyForLeavePage = async () => {
  const userId = await getAuthenticatedUserId();

  const data = await fetchLeaveApplications(userId);
  console.log('data', data);

  const leaveData: LeaveItem[] = data.data;

  console.log('Fetched leave applications:', leaveData);

  return (
    <>
      <Breadcrumbs paths={['Dashboard', 'Leave Applications']} />
      <div className="bg-white">
        <div className="p-6 md:p-8">
          <h2 className="flex item-center gap-4 text-3xl text-[#1D1D1D] px-0 md:px-5 py-8">
            <BookOpenIcon width={34} height={34} />
            Leave Application
          </h2>
          <LeaveApplicationSection />

          <Suspense fallback={<div>Loading...</div>}>
            <LeaveHistorySection data={leaveData} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ApplyForLeavePage;
