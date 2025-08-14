import type { Meta, StoryObj } from '@storybook/react';

// Components
import { LeaveCard } from '@/components';

const meta: Meta<typeof LeaveCard> = {
  title: 'Components/Leave/LeaveCard',
  component: LeaveCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    days: { control: 'number' },
    onClick: { action: 'clicked' },
  },
  args: {
    title: 'Annual Leave',
    days: 10,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
