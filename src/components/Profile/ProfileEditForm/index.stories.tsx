import type { Meta, StoryObj } from '@storybook/react';

import { mockProfile } from '@/mocks/profile';
import { ProfileEditForm } from '@/components';

const meta: Meta<typeof ProfileEditForm> = {
  title: 'Components/Profile/ProfileEditForm',
  component: ProfileEditForm,
  tags: ['autodocs'],
  args: {
    profile: mockProfile,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
