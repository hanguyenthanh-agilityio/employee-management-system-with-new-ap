import { memo } from 'react';

import { CalendarDateRangeIcon } from '@heroicons/react/24/outline';

// Components
import { Button } from '@/components';

interface BirthdayItemProps {
  name: string;
  date: string;
  onClick?: () => void;
}

const BirthdayItem = ({ name, date, onClick }: BirthdayItemProps) => (
  <div
    className="flex flex-wrap justify-between items-center bg-[#EAF1FB] px-4 md:px-6 py-3 rounded-xl shadow-sm gap-y-2"
    role="group"
    aria-label={`Birthday info for ${name}`}
  >
    <div className="flex items-center gap-2 text-cyanBlue text-base md:text-xl">
      <CalendarDateRangeIcon
        className="w-5 h-5 md:w-6 md:h-6"
        aria-hidden="true"
      />
      <span>
        <strong>{name}’s Day</strong> – <time dateTime={date}>{date}</time>
      </span>
    </div>

    <Button
      onClick={onClick}
      className="bg-[#FFC20E] hover:bg-yellow text-black px-3 md:px-4 py-2 rounded-lg shadow-md font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
      aria-label={`Send wishes to ${name}`}
    >
      Send Wishes
    </Button>
  </div>
);

export default memo(BirthdayItem);
