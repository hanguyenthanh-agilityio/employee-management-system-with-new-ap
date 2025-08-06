'use client';

import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components';

// Constants
import { ACTIONS } from '@/constants';

// Styles
import '@/styles/buttonStyle.css';

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
          className="btn-base btn-white-outline btn-sm w-full !py-7"
        >
          {action}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
