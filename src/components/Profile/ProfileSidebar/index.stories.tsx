import { ProfileSidebar } from '@/components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProfileSidebar> = {
  title: 'Components/ProfileSidebar',
  component: ProfileSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      options: ['Personal Details', 'Contact Details'],
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
