import type { Meta, StoryObj } from '@storybook/react';
import Heading from '.';

const meta = {
  title: 'Components/Common/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    title: 'Dashboard',
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
