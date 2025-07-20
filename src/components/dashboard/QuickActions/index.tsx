'use client';

import { useRouter } from 'next/navigation';

// Components

// Constants
import { ACTIONS } from '@/constants';
import { Button } from '@/components/Common/Button/button';

const format = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

const QuickActions = () => {
  const router = useRouter();

  const handleClick = (action: string) => {
    const path = `/dashboard/${format(action)}`;
    router.push(path);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {ACTIONS.map((action, index) => (
        <Button
          key={index}
          onClick={() => handleClick(action)}
          className="h-auto text-back hover:bg-gray-50 bg-white p-4 rounded-full shadow text-2xl font-medium text-center w-full justify-center shadow-[rgba(0, 0, 0, 0.15)]"
        >
          {action}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
