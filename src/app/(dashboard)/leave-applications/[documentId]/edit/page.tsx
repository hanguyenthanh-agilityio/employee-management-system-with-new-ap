import { Suspense } from 'react';

// icons
import { BookOpenIcon } from '@heroicons/react/16/solid';

// APIs
import { fetchLeaveApplicationById } from '@/api/leaveApplications';

// Components
import { Breadcrumbs, EditForm } from '@/components';

const UpdateLeaveContent = async ({ documentId }: { documentId: string }) => {
  const leave = await fetchLeaveApplicationById(documentId);
  console.log('Fetched leave:', leave);

  if (!leave) return <div>Leave application not found!</div>;

  return <EditForm leave={leave.data} />;
};

const UpdateLeavePage = async (props: {
  params: Promise<{ documentId: string }>;
}) => {
  const params = await props.params;
  const documentId = params.documentId;
  console.log('Leave documentId:', documentId);

  return (
    <>
      <Breadcrumbs paths={['Leave Applications', 'Edit']} />
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

        <Suspense>
          <UpdateLeaveContent documentId={documentId} />
        </Suspense>
      </div>
    </>
  );
};

export default UpdateLeavePage;
