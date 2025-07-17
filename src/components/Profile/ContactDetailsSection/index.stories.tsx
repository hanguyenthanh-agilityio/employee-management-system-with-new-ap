import { Meta, StoryObj } from '@storybook/react';

// Components
import { ContactDetailsSection } from '@/components';

// Mocks
import { mockContact } from '@/mocks/profile';

const meta: Meta<typeof ContactDetailsSection> = {
  title: 'Components/Profile/ContactDetailsSection',
  component: ContactDetailsSection,
  tags: ['autodocs'],
  args: {
    contact: mockContact,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
