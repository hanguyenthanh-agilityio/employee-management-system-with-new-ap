'use client';

// Icons
import { CheckCircleIcon } from '@heroicons/react/24/outline';

// Components
import { Button } from '@/components';

const ActivateSection = () => {
  return (
    <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <CheckCircleIcon className="w-12 h-12" />
        <h1 className="text-2xl font-bold">Activate your account</h1>
      </div>
      <p className="text-xl mt-8">Click the button below to confirm</p>
      <Button customClass="flex justify-center items-center w-[150px] h-[54px] text-xl mt-4 py-3 rounded-xl">
        ACTIVATE
      </Button>
    </div>
  );
};

export default ActivateSection;
