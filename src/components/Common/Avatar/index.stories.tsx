import { Meta, StoryObj } from '@storybook/react';

// Components
import { Avatar } from '@/components';

// Constants
import { AVATAR_URL } from '@/constants';

const meta = {
  title: 'Components/Common/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: 'Image URL (from server)',
    },
    preview: {
      control: 'text',
      description: 'Preview image (from client)',
    },
    name: {
      control: 'text',
      description: 'User name (used for fallback)',
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
    url: AVATAR_URL,
  },
};

export const WithoutImage: Story = {
  args: {
    url: undefined,
  },
};
