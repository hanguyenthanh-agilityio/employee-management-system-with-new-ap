'use client';

import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components';

// Constants
import { ACTIONS } from '@/constants';

const format = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

const QuickActions = () => {
  const router = useRouter();

  const handleClick = (action: string) => {
    const path = `/dashboard/${format(action)}`;
    router.push(path);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {ACTIONS.map((action, index) => (
        <Button
          key={index}
          onClick={() => handleClick(action)}
          className="h-auto p-3 sm:p-4 text-sm md:text-xl lg:text-2xl bg-white rounded-full shadow text-center w-full justify-center hover:bg-gray-50 font-medium"
        >
          {action}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
