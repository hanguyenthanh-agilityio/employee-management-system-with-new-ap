'use client';

import { useRouter } from 'next/navigation';

// Constants
import { LEAVE_APPLICATION, LEAVES } from '@/constants';

// Components
import { LeaveCard } from '@/components';

const LeaveApplicationSection = () => {
  const router = useRouter();

  const handleClick = (title: string) => () =>
    router.push(
      `/dashboard/${LEAVE_APPLICATION}/create?type=${encodeURIComponent(title)}`,
    );

  return (
    <div className="w-full overflow-x-auto overflow-y-visible p-2">
      <div className="flex gap-4 min-w-max items-stretch">
        {LEAVES.map((leave, index) => (
          <LeaveCard
            key={index}
            title={leave.title}
            days={leave.days}
            onClick={handleClick(leave.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaveApplicationSection;
