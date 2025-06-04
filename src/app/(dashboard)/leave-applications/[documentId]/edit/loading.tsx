import { Skeleton } from '@/components/Common/Skeleton';
import { BookOpenIcon } from '@heroicons/react/16/solid';

const LoadingFormLeave = () => {
  return (
    <div className="w-full max-w-[1151px] mx-auto bg-white p-14">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-[40px] font-semibold text-[#1D1D1D] flex items-center justify-center gap-4">
          <BookOpenIcon width={45} height={45} />
          <Skeleton customClass="h-10 w-64" />
        </h2>
        <Skeleton customClass="h-4 w-96 mt-4" />
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Leave Type */}
        <div>
          <Skeleton customClass="h-4 w-40 mb-2" />
          <Skeleton customClass="h-10 w-full" />
        </div>

        {/* Start & End Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Skeleton customClass="h-4 w-40 mb-2" />
            <Skeleton customClass="h-10 w-full" />
          </div>
          <div>
            <Skeleton customClass="h-4 w-40 mb-2" />
            <Skeleton customClass="h-10 w-full" />
          </div>
        </div>

        {/* Duration & Resumption Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Skeleton customClass="h-4 w-40 mb-2" />
            <Skeleton customClass="h-10 w-full" />
          </div>
          <div>
            <Skeleton customClass="h-4 w-40 mb-2" />
            <Skeleton customClass="h-10 w-full" />
          </div>
        </div>

        {/* Reason */}
        <div>
          <Skeleton customClass="h-4 w-40 mb-2" />
          <Skeleton customClass="h-24 w-full" />
        </div>

        {/* File Upload */}
        <div>
          <Skeleton customClass="h-4 w-80 mb-2" />
          <Skeleton customClass="h-10 w-full" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Skeleton customClass="h-10 w-32 rounded-lg" />
          <Skeleton customClass="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default LoadingFormLeave;
