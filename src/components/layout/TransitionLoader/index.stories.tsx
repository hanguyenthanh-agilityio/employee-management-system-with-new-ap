import type { Meta, StoryObj } from '@storybook/react';
import TransitionLoader from '.';

const meta: Meta<typeof TransitionLoader> = {
  title: 'Components/common/TransitionLoader',
  component: TransitionLoader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TransitionLoader>;

export const Default: Story = {
  render: () => <TransitionLoader />,
};
