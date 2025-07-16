'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

// Components
import { Avatar, ProfileEditForm } from '@/components';

// Utils
import {
  personalDetails,
  PersonalDetailsInput,
} from '@/utils/schemas/updateProfile';

// Types
import { PersonalDetailsType } from '@/types/profile';

// Services
import { updateProfile } from '@/services/apiService';

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

  const router = useRouter();

  const { handleSubmit, reset } = form;

  const handleSubmitForm = async (data: PersonalDetailsInput) => {
    const result = await updateProfile(userId, data);

    if (result.success) {
      reset(data);
      router.refresh();
    } else {
      console.error(result.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 p-6 w-full">
      <Avatar src={avatarUrl} name={profile.username} />

      <form
        data-testid="profile-edit-form"
        className="flex flex-col gap-14 text-center"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <ProfileEditForm form={form} />
      </form>
    </div>
  );
};

export default ProfileDisplay;
