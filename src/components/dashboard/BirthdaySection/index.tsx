'use client';

import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';

// Components
import { Card, BirthdayItem } from '@/components';

// Constants
import { BIRTHDAYS } from '@/constants';

// Styles
import '@/styles/cardStyle.css';

const BirthdaySection = () => (
  <Card className="card-section">
    <div className="card-header">
      <h2 className="card-title">Birthdays</h2>
      <EllipsisVerticalIcon className="text-[#000] w-6 h-6 sm:w-7 sm:h-7" />
    </div>
    <div className="flex flex-col gap-4 py-6 md:py-10">
      {BIRTHDAYS.map((item, index) => (
        <BirthdayItem key={index} name={item.name} date={item.date} />
      ))}
    </div>
  </Card>
);

export default BirthdaySection;
