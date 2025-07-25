import type { Meta, StoryObj } from '@storybook/react';
import ProfileSection from '.';

const meta: Meta<typeof ProfileSection> = {
  title: 'Components/Profile/ProfileSection',
  component: ProfileSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'John Doe',
    jobTitle: 'Developer',
  },
};

export default meta;
type Story = StoryObj<typeof ProfileSection>;

export const Default: Story = {};
