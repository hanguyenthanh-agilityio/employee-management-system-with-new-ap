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
  <Card className="p-6 sm:p-8 md:p-10">
    <div className="flex justify-between items-start">
      <h2 className="font-bold text-cyanBlue text-lg sm:text-2xl md:text-3xl">
        Available Leave Days
      </h2>
      <EllipsisVerticalIcon className="text-black w-6 h-6 sm:w-7 sm:h-7" />
    </div>

    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 py-5 sm:py-7 md:py-10">
      {data.length ? (
        data.map(({ type, total }) => (
          <ProgressBar key={type} type={type} total={total} />
        ))
      ) : (
        <NotFoundMessage
          title="No leave data available"
          className="text-gray-400 text-base sm:text-lg"
        />
      )}
    </div>
  </Card>
);

export default LeaveSection;
