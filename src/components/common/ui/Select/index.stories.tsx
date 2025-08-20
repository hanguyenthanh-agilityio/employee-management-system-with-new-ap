import type { Meta, StoryObj } from '@storybook/react';

// Components
import Select from './';

const meta = {
  title: 'Components/Common/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    label: 'Filter by Type:',
    name: 'type',
    options: [
      { value: 'annual', label: 'Annual Leave' },
      { value: 'sick', label: 'Sick Leave' },
      { value: 'maternity', label: 'Maternity Leave' },
    ],
    value: 'annual',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomClass: Story = {
  args: {
    className: 'flex items-center justify-center text-lg',
  },
};
