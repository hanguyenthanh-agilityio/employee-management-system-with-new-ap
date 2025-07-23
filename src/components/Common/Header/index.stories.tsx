import type { Meta, StoryObj } from '@storybook/react';
import Header from '.';

const meta = {
  title: 'Components/Common/Header',
  component: Header,
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
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
