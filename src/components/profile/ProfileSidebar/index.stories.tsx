import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProfileSidebar } from '@/components';

// Constants
import { TABS_SIDEBAR } from '@/constants';

const meta: Meta<typeof ProfileSidebar> = {
  title: 'Components/Profile/ProfileSidebar',
  component: ProfileSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      options: TABS_SIDEBAR,
    },
    onSelect: { action: 'tab selected' },
  },
  args: {
    selected: 'Personal Details',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
