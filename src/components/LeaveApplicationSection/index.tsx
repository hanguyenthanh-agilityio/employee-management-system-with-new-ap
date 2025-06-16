'use client';

import { useRouter } from 'next/navigation';

// Constants
import { LEAVE_APPLICATION, leaves } from '@/constants';

// Utils
import { formatTitleToPath } from '@/utils/format';

// Components
import { LeaveCard } from '@/components';

const LeaveApplicationSection = () => {
  const router = useRouter();

  const handleClick = (title: string): (() => void) => {
    return () => {
      const path = `${LEAVE_APPLICATION}/create?type=${formatTitleToPath(title)}`;
      router.push(path);
    };
  };

  return (
    <div className="w-full px-0 overflow-x-auto">
      <div className="flex gap-4 w-max sm:w-full">
        {leaves.map((leave, index) => (
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
