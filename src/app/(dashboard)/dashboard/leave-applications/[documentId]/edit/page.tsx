import { Metadata } from 'next';

import { Suspense } from 'react';

// icons
import { BookOpenIcon } from '@heroicons/react/16/solid';

// Services
import { getLeaveApplicationById } from '@/services/leave/leaveService';

// Components
import { Breadcrumbs, EditForm, LoadingFormLeave } from '@/components';
import ToastProvider from '@/components/status/ToastProvider';

// Constants
import { BREADCRUMBS } from '@/constants';

type Props = {
  params: { documentId: string };
};

// generateMetadata: dynamic metadata from API
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const leaveApplication = await getLeaveApplicationById(params.documentId);

  return {
    title: `Update Leave - ${leaveApplication.data.type}`,
    description: `Edit leave request from ${leaveApplication.data.startDate} to ${leaveApplication.data.endDate}.`,
  };
}

const UpdateLeaveContent = async ({ documentId }: { documentId: string }) => {
  const leaveApplication = await getLeaveApplicationById(documentId);
  console.log('leaveApplication', leaveApplication);

  if (!leaveApplication) return <div>Leave application not found!</div>;

  return <EditForm leave={leaveApplication.data} />;
};

const UpdateLeavePage = async (props: {
  params: Promise<{ documentId: string }>;
}) => {
  const params = await props.params;
  const documentId = params.documentId;

  return (
    <>
      <Breadcrumbs paths={BREADCRUMBS.UPDATE_LEAVE} />

      {/* Main content */}
      <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-darkSecondary px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-10 lg:py-14 shadow-md mt-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-8 md:mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <BookOpenIcon className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
            Leave Application
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-400">
            Fill the required fields below to apply for leave.
          </p>
        </div>

        {/* Update form */}
        <Suspense fallback={<LoadingFormLeave />}>
          <UpdateLeaveContent documentId={documentId} />
        </Suspense>
      </div>
      <ToastProvider />
    </>
  );
};

export default UpdateLeavePage;
