import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './textarea';

const meta = {
  title: 'Components/Common/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Type something...',
  },
  argTypes: {
    error: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
};
