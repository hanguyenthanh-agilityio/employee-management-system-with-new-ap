import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProfileEditForm } from '@/components';

const meta = {
  title: 'Components/Profile/ProfileEditForm',
  component: ProfileEditForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProfileEditForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
