import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProfileDisplay } from '@/components';

// Constants
import { AVATAR_URL } from '@/constants';

const meta: Meta<typeof ProfileDisplay> = {
  title: 'Components/Profile/ProfileDisplay',
  component: ProfileDisplay,
  tags: ['autodocs'],
  args: {
    avatarName: 'Jane Doe',
    avatarUrl: AVATAR_URL,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
