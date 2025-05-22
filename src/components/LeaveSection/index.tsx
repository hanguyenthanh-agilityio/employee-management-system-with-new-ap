// Icons
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';

// Components
import { Card, ProgressBar } from '@/components';

// Constants
import { leaveData } from '@/constants';

const LeaveSection = () => (
  <Card className="p-8">
    <div className="flex justify-between items-start">
      <h2 className="font-bold text-cyanBlue text-3xl">Available Leave Days</h2>
      <EllipsisVerticalIcon className="text-[#000] w-7 h-7" />
    </div>
    <div className="flex flex-col gap-6 py-10">
      {leaveData.map((item, index) => (
        <ProgressBar
          key={index}
          label={item.label}
          current={item.current}
          total={item.total}
        />
      ))}
    </div>
  </Card>
);

export default LeaveSection;
