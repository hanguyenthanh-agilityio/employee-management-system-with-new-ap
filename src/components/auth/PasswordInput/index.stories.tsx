import type { Meta, StoryObj } from '@storybook/react';
import PasswordInput from '.';

const meta: Meta<typeof PasswordInput> = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter your password',
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: 'Password is required',
  },
};
