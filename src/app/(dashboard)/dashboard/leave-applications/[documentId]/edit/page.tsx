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
