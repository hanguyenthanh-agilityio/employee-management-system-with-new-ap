// Icons
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';

// Components
import { Card, NotFoundMessage, ProgressBar } from '@/components';

interface props {
  type: string;
  total: number;
}
interface LeaveSectionProps {
  data: props[];
}

const LeaveSection = ({ data }: LeaveSectionProps) => (
  <Card className="p-8">
    <div className="flex justify-between items-start">
      <h2 className="font-bold text-cyanBlue text-3xl">Available Leave Days</h2>
      <EllipsisVerticalIcon className="text-[#000] w-7 h-7" />
    </div>
    <div className="flex flex-col gap-6 py-10">
      {data.length ? (
        data.map((item, index) => (
          <ProgressBar key={index} type={item.type} total={item.total} />
        ))
      ) : (
        <NotFoundMessage
          title="No leave data available"
          className="text-gray-400"
        />
      )}
    </div>
  </Card>
);

export default LeaveSection;
