import { Metadata } from 'next';

import { lazy, Suspense } from 'react';

// Icons
import { BookOpenIcon } from '@heroicons/react/16/solid';

// Components
import { Breadcrumbs, LoadingFormLeave } from '@/components';

// Constants
import { BREADCRUMBS } from '@/constants';

// Styles
import '@/styles/formStyle.css';

const CreateLeaveContent = lazy(() => import('@/components/leave/CreateForm'));

export const metadata: Metadata = {
  title: 'Create Leave',
};

const CreateLeavePage = () => {
  return (
    <>
      <Breadcrumbs paths={BREADCRUMBS.CREATE_LEAVE} />

      <div className="leave-form-wrapper">
        <div className="form-header">
          <h2 className="form-title">
            <BookOpenIcon className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
            Leave Application
          </h2>
          <p className="form-subtitle">
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
