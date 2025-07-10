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
import { PersonalDetails } from '@/types';

interface ProfileDisplayProps {
  avatarName: string;
  avatarUrl?: string;
  profile: PersonalDetails;
}

const ProfileDisplay = ({
  avatarName,
  avatarUrl,
  profile,
}: ProfileDisplayProps) => {
  const form = useForm<PersonalDetailsInput>({
    resolver: zodResolver(personalDetails),
    defaultValues: {
      username: profile.username,
      department: profile.department,
      jobTitle: profile.jobTitle,
      jobCategory: profile.jobCategory,
    },
  });

  return (
    <div className="flex flex-col items-center gap-10 p-6 w-full">
      <Avatar src={avatarUrl} name={avatarName} />

      <form
        data-testid="profile-edit-form"
        className="flex flex-col gap-14 text-center"
        onSubmit={form.handleSubmit(console.log)}
      >
        <ProfileEditForm form={form} />
      </form>
    </div>
  );
};

export default ProfileDisplay;
