import type { Meta, StoryObj } from '@storybook/react';

// Components
import { InfoBlock } from '@/components';

const meta = {
  title: 'Components/InfoBlock',
  component: InfoBlock,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    label: 'Job Title',
    value: 'Software Engineer',
    className: 'items-center justify-center',
  },
} satisfies Meta<typeof InfoBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
