import type { Meta, StoryObj } from '@storybook/react';
import RegisterForm from '@/components/auth/RegisterForm';

const meta: Meta<typeof RegisterForm> = {
  title: 'Forms/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  render: () => <RegisterForm />,
};
