import type { Meta, StoryObj } from '@storybook/react';

// Icons
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';

// Constants
import { PAY_ROWS } from '@/constants/table';
import Card from '.';
import { BirthdayItem } from '@/components/dashboard';
import ProgressBar from '../ProgressBar';
import Table from '../Table';

// Component

const meta = {
  title: 'Components/Common/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
  args: {
    children: 'This is a card',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithBirthdayContent: Story = {
  args: {
    children: (
      <>
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-cyanBlue text-3xl pl-4">Birthdays</h2>
          <EllipsisVerticalIcon className="text-[#000] w-7 h-7" />
        </div>
        <div className="flex flex-col gap-4 py-10">
          <BirthdayItem name={'biruk kidan’s Day'} date={'April 25th'} />
        </div>
      </>
    ),
  },
};

export const WithLeaveContent: Story = {
  args: {
    children: (
      <>
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-cyanBlue text-3xl">
            Available Leave Days
          </h2>
          <EllipsisVerticalIcon className="text-[#000] w-7 h-7" />
        </div>
        <div className="flex flex-col gap-6 py-10">
          <ProgressBar type={'Annual Leave'} total={60} />
        </div>
      </>
    ),
  },
};

export const WithPayContent: Story = {
  args: {
    children: (
      <>
        <div className="flex justify-between items-start pb-4">
          <h2 className="font-bold text-cyanBlue text-3xl pl-4">
            April Pay slip breakdown
          </h2>
          <EllipsisVerticalIcon className="text-[#000] w-7 h-7" />
        </div>
        <Table
          headers={['Earnings', 'Amount', 'Deductions', 'Total']}
          rows={PAY_ROWS}
        />
      </>
    ),
  },
};
