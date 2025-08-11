import { Meta, StoryObj } from '@storybook/react';
import type { StoryFn } from '@storybook/react';

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

const Template: StoryFn<{ name: string; url?: string }> = (args) => (
  <div className="w-24 h-24">
    <Avatar {...args} />
  </div>
);

export const WithImage = Template.bind({});
WithImage.args = {
  name: 'Anna',
  url: AVATAR_URL,
};

export const WithoutImage: Story = {
  render: Template,
  args: {
    name: 'Diana',
    url: '',
  },
};
