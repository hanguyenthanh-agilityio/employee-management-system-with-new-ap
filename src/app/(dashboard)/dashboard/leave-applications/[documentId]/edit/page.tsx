import { Metadata } from 'next';

import { Suspense } from 'react';

// icons
import { BookOpenIcon } from '@heroicons/react/16/solid';

// Services
import { getLeaveApplicationById } from '@/services/leave/leaveService';

// Components
import {
  Breadcrumbs,
  EditForm,
  LoadingFormLeave,
  ToastProvider,
} from '@/components';

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
      <div className="w-full max-w-[1151px] mx-auto bg-white p-14">
        <div className="flex flex-col items-center">
          <h2 className="text-[40px] font-semibold text-[#1D1D1D] flex items-center justify-center gap-4">
            <BookOpenIcon width={45} height={45} />
            Leave Application
          </h2>
          <span className="text-[25px] text-[#1D1D1D] py-4">
            Fill the required fields below to apply for annual leave.
          </span>
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
