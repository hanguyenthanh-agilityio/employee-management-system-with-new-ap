import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumbs from '../../layout/Breadcrumb';

const meta = {
  title: 'Components/Layout/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    paths: {
      control: 'object',
      description: 'Array of breadcrumb paths',
    },
  },
  args: {
    paths: ['Dashboard', 'Leave Applications', 'Create Leave'],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SinglePath: Story = {
  args: {
    paths: ['Dashboard'],
  },
};
