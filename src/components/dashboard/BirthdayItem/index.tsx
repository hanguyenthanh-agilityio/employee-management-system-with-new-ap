import { memo } from 'react';

import { CalendarDateRangeIcon } from '@heroicons/react/24/outline';

// Components
import { Button } from '@/components';

// Styles
import '@/styles/buttonStyle.css';
import '@/styles/cardStyle.css';
import '@/styles/textStyle.css';

interface BirthdayItemProps {
  name: string;
  date: string;
  onClick?: () => void;
}

const BirthdayItem = ({ name, date, onClick }: BirthdayItemProps) => (
  <div
    className="card card-blue card-row card-space"
    role="group"
    aria-label={`Birthday info for ${name}`}
  >
    <div className="flex items-center gap-2 text-cyanBlue text-base-md">
      <CalendarDateRangeIcon
        className="w-5 h-5 md:w-6 md:h-6"
        aria-hidden="true"
      />
      <span className="truncate-text">
        <strong>{name}’s Day</strong> – <time dateTime={date}>{date}</time>
      </span>
    </div>

    <Button
      onClick={onClick}
      className="btn-base btn-yellow w-full md:w-auto"
      aria-label={`Send wishes to ${name}`}
    >
      Send Wishes
    </Button>
  </div>
);

export default memo(BirthdayItem);
