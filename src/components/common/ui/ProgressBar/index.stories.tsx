import type { Meta, StoryObj } from '@storybook/react';

// Components
import ProgressBar from './';

const meta = {
  title: 'Components/Common/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'text' },
    total: { control: 'number' },
    color: { control: 'color' },
  },
  args: {
    type: 'Annual Leave',
    total: 60,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
