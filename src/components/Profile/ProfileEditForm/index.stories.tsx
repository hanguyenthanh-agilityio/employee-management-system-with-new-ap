import type { Meta, StoryObj } from '@storybook/react';

import { useForm } from 'react-hook-form';

// Components
import { ProfileEditForm } from '@/components';

// Utils
import { PersonalDetailsInput } from '@/utils/schemas/updateProfile';

// Mocks
import { mockProfile } from '@/mocks/profile';

const meta: Meta<typeof ProfileEditForm> = {
  title: 'Components/Profile/ProfileEditForm',
  component: ProfileEditForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfileEditForm>;

const Form = () => {
  const form = useForm<PersonalDetailsInput>({
    defaultValues: mockProfile,
  });

  return <ProfileEditForm form={form} disable={false} />;
};

export const Default: Story = { render: () => <Form /> };
