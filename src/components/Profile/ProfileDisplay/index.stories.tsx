import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProfileDisplay } from '@/components';

const meta: Meta<typeof ProfileDisplay> = {
  title: 'Components/ProfileDisplay',
  component: ProfileDisplay,
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'onEdit' },
  },
  args: {
    name: 'Biruk Dawit',
    avatarName: 'Biruk Dawit',
    avatarUrl:
      'https://images.icon-icons.com/3708/PNG/512/girl_female_woman_person_people_avatar_icon_230016.png',
    department: 'Engineering',
    jobTitle: 'Frontend Developer',
    jobCategory: 'Full-time',
  },
} satisfies Meta<typeof ProfileDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
