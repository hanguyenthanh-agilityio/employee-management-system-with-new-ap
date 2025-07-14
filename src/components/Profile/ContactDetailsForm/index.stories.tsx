import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

// Components
import { ContactDetailsForm } from '@/components';

// Utils
import { ContactDetailsInput } from '@/utils/schemas/updateProfile';

// Mocks
import { mockContact } from '@/mocks/profile';

const meta: Meta<typeof ContactDetailsForm> = {
  title: 'Components/Profile/ContactDetailsForm',
  component: ContactDetailsForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ContactDetailsForm>;

const Form = () => {
  const form = useForm<ContactDetailsInput>({
    defaultValues: mockContact,
  });

  return <ContactDetailsForm form={form} />;
};

export const Default: Story = { render: () => <Form /> };
