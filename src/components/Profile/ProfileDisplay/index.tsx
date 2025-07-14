'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Components
import { Avatar, ProfileEditForm } from '@/components';

// Utils
import {
  personalDetails,
  PersonalDetailsInput,
} from '@/utils/schemas/updateProfile';

// Types
import { PersonalDetailsType } from '@/types/profile';

interface ProfileDisplayProps {
  avatarUrl?: string;
  profile: PersonalDetailsType;
}

const ProfileDisplay = ({ avatarUrl, profile }: ProfileDisplayProps) => {
  const form = useForm<PersonalDetailsInput>({
    resolver: zodResolver(personalDetails),
    defaultValues: {
      username: profile.username,
      department: profile.department,
      jobTitle: profile.jobTitle,
      jobCategory: profile.jobCategory,
    },
  });

  const handleSubmitForm = () => {};

  return (
    <div className="flex flex-col items-center gap-10 p-6 w-full">
      <Avatar src={avatarUrl} name={profile.username} />

      <form
        data-testid="profile-edit-form"
        className="flex flex-col gap-14 text-center"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <ProfileEditForm form={form} />
      </form>
    </div>
  );
};

export default ProfileDisplay;
