// Icons
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';

// constants
import { PAY_ROWS } from '@/constants';

// Components
import { Card, Table } from '@/components';

const PaySlipSection = () => (
  <Card className="py-6 px-4 md:px-6">
    <div className="flex justify-between items-start pb-4">
      <h2 className="font-bold text-cyanBlue text-xl sm:text-2xl md:text-3xl pl-2">
        April Pay slip breakdown
      </h2>
      <button
        aria-label="More options"
        className="text-black hover:text-gray-700 transition-colors"
      >
        <EllipsisVerticalIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    </div>

    <Table
      headers={['Earnings', 'Amount', 'Deductions', 'Total']}
      rows={PAY_ROWS}
    />
  </Card>
);

export default PaySlipSection;
