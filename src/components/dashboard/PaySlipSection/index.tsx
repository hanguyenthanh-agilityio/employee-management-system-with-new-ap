// Icons
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';

// constants
import { PAY_ROWS } from '@/constants';

// Components
import { Card, Table } from '@/components';

// Styles
import '@/styles/cardStyle.css';

const PaySlipSection = () => (
  <Card className="card-section">
    <div className="card-header">
      <h2 className="card-title pb-4">April Pay slip breakdown</h2>
      <button
        aria-label="More options"
        className="text-foreground hover:text-muted-foreground transition-colors"
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
