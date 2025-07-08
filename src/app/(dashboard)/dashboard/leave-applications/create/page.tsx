import { Metadata } from 'next';

import { lazy, Suspense } from 'react';

// Icons
import { BookOpenIcon } from '@heroicons/react/16/solid';

// Components
import { Breadcrumbs, LoadingFormLeave } from '@/components';

// Constants
import { BREADCRUMBS } from '@/constants';

const CreateLeaveContent = lazy(() => import('@/components/CreateForm'));

export const metadata: Metadata = {
  title: 'Create Leave',
};

const CreateLeavePage = () => {
  return (
    <>
      <Breadcrumbs paths={BREADCRUMBS.CREATE_LEAVE} />

      <div className="w-full max-w-screen-lg mx-auto bg-white px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-10 lg:py-14 shadow-md">
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 flex items-center justify-center gap-3">
            <BookOpenIcon className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
            Leave Application
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700">
            Fill the required fields below to apply for leave.
          </p>
        </div>

        <Suspense fallback={<LoadingFormLeave />}>
          <CreateLeaveContent />
        </Suspense>
      </div>
    </>
  );
};

export default CreateLeavePage;
