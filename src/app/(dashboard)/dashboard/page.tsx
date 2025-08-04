import { Suspense } from 'react';

// Components
import { DashboardSkeleton, DashboardWrapper } from '@/components';

const Page = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardWrapper />
    </Suspense>
  );
};

export default Page;
