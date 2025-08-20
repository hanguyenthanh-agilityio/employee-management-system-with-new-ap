import type { Meta, StoryObj } from '@storybook/react';

// Icons
import { ArrowDownCircleIcon } from '@heroicons/react/16/solid';

// Components
import Dropdown from '.';

const meta = {
  title: 'Components/Common/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buttonLabel: { control: 'text' },
    buttonClassName: { control: 'text' },
  },
  args: {
    buttonLabel: 'Actions',
    actions: [
      { label: 'Edit', onClick: () => alert('Edit clicked') },
      { label: 'Delete', onClick: () => alert('Delete clicked') },
    ],
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ height: '100px' }}>
      <Dropdown {...args} />
    </div>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <div style={{ height: '150px' }}>
      <Dropdown {...args} />
    </div>
  ),
  args: {
    buttonLabel: 'Action',
    buttonClassName:
      'rounded-lg gap-2 bg-primary text-white font-bold px-6 py-2 text-sm hover:bg-blue-800 transition-all duration-200 ease-in-out',
    actions: [
      {
        label: 'Edit',
        onClick: () => alert('Edit'),
        textClass: 'text-blue-600',
      },
      {
        label: 'Delete',
        onClick: () => alert('Delete'),
        textClass: 'text-red-600',
      },
    ],
  },
};

export const WithExportFile: Story = {
  render: (args) => (
    <div style={{ height: '200px' }}>
      <Dropdown {...args} />
    </div>
  ),
  args: {
    buttonLabel: 'Export',
    buttonClassName:
      'flex items-center rounded p-2 bg-[#3F861E] text-white hover:bg-green flex gap-8 text-lg rounded-[14px] py-3 px-11 shadow-[11px_4px_14px_0px_#0000001F]',
    icon: <ArrowDownCircleIcon width={19} height={19} />,
    actions: [
      {
        label: 'Export PDF',
        onClick: () => alert('PDF'),
      },
      {
        label: 'Export CSV',
        onClick: () => alert('CSV'),
      },
      {
        label: 'Export Excel',
        onClick: () => alert('Excel'),
      },
    ],
  },
};
