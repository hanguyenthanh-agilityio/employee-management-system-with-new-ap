import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProfileDisplay } from '@/components';

// Constants
import { AVATAR_URL } from '@/constants';

// Mocks
import { mockProfile } from '@/mocks/profile';

const meta: Meta<typeof ProfileDisplay> = {
  title: 'Components/Profile/ProfileDisplay',
  component: ProfileDisplay,
  tags: ['autodocs'],
  args: {
    avatarUrl: AVATAR_URL,
    profile: mockProfile,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
