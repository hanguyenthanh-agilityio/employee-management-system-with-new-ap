import { Suspense } from 'react';

// Components
import {
  DashboardSkeleton,
  DashboardWrapper,
  ToastProvider,
} from '@/components';

const Page = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardWrapper />
      <ToastProvider />
    </Suspense>
  );
};

export default Page;
