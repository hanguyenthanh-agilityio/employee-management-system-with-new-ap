'use client';

import { Breadcrumbs, LoadingFormLeave } from '@/components';
import CreateLeaveForm from '../CreateForm';
import { BREADCRUMBS } from '@/constants';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const CreateLeaveContent = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'Leave';

  return (
    <>
      <Breadcrumbs paths={BREADCRUMBS.CREATE_LEAVE(type)} />

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
          <CreateLeaveForm />
        </Suspense>
      </div>
    </>
  );
};

export default CreateLeaveContent;
