'use client';

import { useSearchParams } from 'next/navigation';

// Icons
import { BookOpenIcon } from '@heroicons/react/16/solid';

// APIs
import { createLeaveApplication } from '@/api/leaveApplications';

// Components
import { Breadcrumbs, Form } from '@/components';

const CreateLeavePage = () => {
  const searchParams = useSearchParams();
  const leaveTypeFromQuery = searchParams.get('type') || undefined;

  return (
    <>
      <Breadcrumbs paths={['Leave Applications', 'Annual Leave']} />
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

        <form action={createLeaveApplication} className="space-y-6">
          <Form defaultLeaveType={leaveTypeFromQuery} />
        </form>
      </div>
    </>
  );
};

export default CreateLeavePage;
