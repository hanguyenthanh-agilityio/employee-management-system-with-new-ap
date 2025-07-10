import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ContactDetailsForm } from '@/components';

const meta: Meta<typeof ContactDetailsForm> = {
  title: 'Components/Profile/ContactDetailsForm',
  component: ContactDetailsForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
