'use client';

import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components';

// Constants
import { ACTION } from '@/constants';

const format = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

const QuickActions = () => {
  const router = useRouter();

  const handleClick = (action: string) => {
    const path = `/dashboard/${format(action)}`;
    router.push(path);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {ACTION.map((action, index) => (
        <Button
          key={index}
          onClick={() => handleClick(action)}
          variant="outline"
          customClass="bg-white p-4 rounded-full shadow text-2xl font-medium text-center w-full justify-center shadow-[rgba(0, 0, 0, 0.15)]"
        >
          {action}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
