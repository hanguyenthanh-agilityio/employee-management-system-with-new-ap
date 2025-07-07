import { Meta, StoryObj } from '@storybook/react';
import Avatar from '.';

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
    src: 'https://images.icon-icons.com/3708/PNG/512/girl_female_woman_person_people_avatar_icon_230016.png',
  },
};

export const WithoutImage: Story = {
  args: {
    src: null,
  },
};
