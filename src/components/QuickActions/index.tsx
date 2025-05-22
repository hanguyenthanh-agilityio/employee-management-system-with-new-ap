'use client';

import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components';

const actions = [
  'Leave Applications',
  'KPI Goals',
  'Take Appraisal',
  'View Payslip',
  'Update Profile',
  'Events',
];

const format = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

const QuickActions = () => {
  const router = useRouter();

  const handleClick = (action: string) => {
    const path = `/${format(action)}`;
    router.push(path);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {actions.map((action, index) => (
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
