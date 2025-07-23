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

const avatarValue: string | null =
  Array.isArray(mockProfile.avatar) &&
  typeof mockProfile.avatar[0]?.url === 'string'
    ? mockProfile.avatar[0].url
    : null;

const defaultValues: PersonalDetailsInput = {
  username: mockProfile.username,
  department: mockProfile.department,
  jobTitle: mockProfile.jobTitle,
  jobCategory: mockProfile.jobCategory,
  documentId: undefined,
  avatar: avatarValue,
};

const Form = () => {
  const form = useForm<PersonalDetailsInput>({
    defaultValues,
  });

  return <ProfileEditForm form={form} disable={false} />;
};

export const Default: Story = {
  render: () => <Form />,
};
