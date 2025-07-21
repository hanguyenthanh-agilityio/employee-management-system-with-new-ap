import type { Meta, StoryObj } from '@storybook/react';
import BirthdayItem from '.';

const meta = {
  title: 'Components/BirthdayItem',
  component: BirthdayItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'send wishes clicked' },
    name: { control: 'text' },
    date: { control: 'text' },
  },
  args: {
    name: 'Alice',
    date: 'May 21, 2025',
  },
} satisfies Meta<typeof BirthdayItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
