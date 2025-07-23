import { Meta, StoryObj } from '@storybook/react';
import QuickActions from '.';

const meta: Meta<typeof QuickActions> = {
  title: 'Components/Dashboard/QuickAction',
  component: QuickActions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuickActions>;

export const Default: Story = {
  render: () => <QuickActions />,
};
