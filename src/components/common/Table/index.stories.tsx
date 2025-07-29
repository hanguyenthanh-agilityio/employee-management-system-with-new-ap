import type { Meta, StoryObj } from '@storybook/react';

// Components
import Table from '.';

const meta = {
  title: 'Components/common/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    headers: ['Earnings', 'Amount', 'Deductions', 'Total'],
    rows: [['Basic Wage', '150,000', '-30,000', '120.000']],
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const EmptyTable: Story = {
  args: {
    headers: ['No Data Available'],
    rows: [],
  },
};
