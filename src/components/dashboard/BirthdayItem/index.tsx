import { Button } from '@/components/Common/Button/button';
import { CalendarDateRangeIcon } from '@heroicons/react/24/outline';

// Components

interface BirthdayItemProps {
  name: string;
  date: string;
  onClick?: () => void;
}

const BirthdayItem = ({ name, date, onClick }: BirthdayItemProps) => (
  <div className="flex justify-between items-center bg-[#EAF1FB] px-6 py-3 rounded-xl shadow-sm">
    <div className="flex items-center gap-2 text-cyanBlue text-xl">
      <CalendarDateRangeIcon className="w-7 h-7" />
      <span>
        {name}’s Day - {date}
      </span>
    </div>
    <Button
      onClick={onClick}
      className="bg-[#FFC20E] hover:bg-yellow text-black px-4 py-2 rounded-lg shadow-[5px_4px_8px_6px_rgba(0,0,0,0.12)] font-semibold transition"
    >
      Send Wishes
    </Button>
  </div>
);

export default BirthdayItem;
