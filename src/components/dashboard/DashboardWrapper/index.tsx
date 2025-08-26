import { Suspense } from 'react';
import { redirect } from 'next/navigation';

// Components
import {
  BirthdaySection,
  LeaveSectionSkeleton,
  Heading,
  LeaveSection,
  PaySlipSection,
  ProfileSection,
  QuickActions,
} from '@/components';

// Services
import { getCurrentUser } from '@/services/user/userService';

// APIs
import { fetchSummaryLeaves } from '@/actions/leaveApplications';

const DashboardWrapper = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const { username, jobTitle } = user;

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-12 lg:px-8">
      <h1 className="sr-only">Dashboard page</h1>
      <Heading title="Dashboard" />

      <ProfileSection name={username} jobTitle={jobTitle} />

      <div>
        <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl">Quick Actions</h2>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<LeaveSectionSkeleton />}>
          <LeaveSectionAsync />
        </Suspense>

        <BirthdaySection />
        <PaySlipSection />
      </div>
    </div>
  );
};

export default DashboardWrapper;

const LeaveSectionAsync = async () => {
  const summaryData = await fetchSummaryLeaves();
  return <LeaveSection data={summaryData.data} />;
};
