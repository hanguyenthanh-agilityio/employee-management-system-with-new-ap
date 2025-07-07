import { Meta, StoryObj } from '@storybook/react';

// Components
import { Avatar } from '@/components';

// Constants
import { AVATAR_URL } from '@/constants';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image URL',
    },
    name: {
      control: 'text',
      description: 'User name',
    },
  },
  args: {
    name: 'Diana',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: AVATAR_URL,
  },
};

export const WithoutImage: Story = {
  args: {
    src: null,
  },
};
