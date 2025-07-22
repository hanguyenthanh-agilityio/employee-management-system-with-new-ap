import { Meta, StoryObj } from '@storybook/react';
import TopBar from '.';
import { ROUTER } from '@/constants';

const meta: Meta<typeof TopBar> = {
  title: 'Components/Layout/TopBar',
  component: TopBar,
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'fullscreen', nextRouter: { pathname: ROUTER.LOGIN } },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
  render: () => <TopBar />,
};
