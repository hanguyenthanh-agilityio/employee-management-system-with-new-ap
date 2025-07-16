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

// Hooks
import { useUpdateProfile } from '@/hooks/useProfile';

interface ProfileDisplayProps {
  avatarUrl?: string;
  profile: PersonalDetailsType;
  userId: number;
}

const ProfileDisplay = ({
  avatarUrl,
  profile,
  userId,
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

  const { handleSubmit, reset } = form;

  const { update, isPending, errorMessage } = useUpdateProfile();

  const handleSubmitForm = async (data: PersonalDetailsInput) => {
    const result = await update(userId, data);

    if (result.success) reset(data);
  };

  return (
    <div className="flex flex-col items-center gap-10 p-6 w-full">
      <Avatar src={avatarUrl} name={profile.username} />

      <form
        data-testid="profile-edit-form"
        className="flex flex-col gap-14 text-center"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <ProfileEditForm form={form} disable={isPending} />
        {errorMessage && <p className="text-red">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ProfileDisplay;
