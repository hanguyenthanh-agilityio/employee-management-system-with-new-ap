import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Skeleton } from '.';

const meta = {
  title: 'Components/Common/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    customClass: { control: 'text' },
  },
  args: {
    customClass: 'w-16 h-5 mb-1',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomHeightWidth: Story = {
  args: {
    customClass: 'w-24 h-24',
  },
};

export const LongSkeleton: Story = {
  args: {
    customClass: 'w-96 h-5',
  },
};
