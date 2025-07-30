'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Avatar, Input, ProfileEditForm, Button } from '@/components';

// Utils
import {
  personalDetails,
  PersonalDetailsInput,
} from '@/utils/schemas/updateProfile';
import { uploadFileToStrapi } from '@/utils/upload';
import { getAvatarUrl } from '@/utils/avatar';

// Hooks
import { useUpdateProfile } from '@/hooks/useProfile';

// Types
import { PersonalDetailsType } from '@/types/profile';

// Constants
import { ERROR_MESSAGE } from '@/constants';

interface ProfileDisplayProps {
  avatarUrl?: string;
  profile: PersonalDetailsType;
}

const ProfileDisplay = ({ avatarUrl, profile }: ProfileDisplayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(avatarUrl);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<PersonalDetailsInput>({
    resolver: zodResolver(personalDetails),
    defaultValues: {
      username: profile.username ?? '',
      department: profile.department ?? '',
      jobTitle: profile.jobTitle ?? '',
      jobCategory: profile.jobCategory ?? '',
      avatar: undefined,
    },
  });

  const { handleSubmit, reset, setValue } = form;
  const { update, isPending, errorMessage, setErrorMessage } =
    useUpdateProfile();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setPreview(URL.createObjectURL(selectedFile));
    setFile(selectedFile);

    setValue('avatar', selectedFile, { shouldDirty: true });
  };

  const handleChooseFile = () => inputRef.current?.click();

  const handleSubmitForm = async (data: PersonalDetailsInput) => {
    setErrorMessage('');

    try {
      const avatarId = file ? await uploadFileToStrapi(file) : null;

      const payload = {
        ...data,
        ...(avatarId && { avatar: avatarId }),
      };

      const result = await update(payload, profile.id);

      if (result.success) {
        reset(data);
      } else {
        setErrorMessage(result.message || ERROR_MESSAGE.UPDATE_USER_FAIL);
      }
    } catch (err) {
      setErrorMessage(ERROR_MESSAGE.UNEXPECTED);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 p-6 w-full">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 mx-auto group">
        <Avatar
          name={profile.username}
          url={preview || getAvatarUrl(profile.avatar)}
          preview={preview}
        />

        <Input
          data-testid="file-input"
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          data-testid="change-button"
          type="button"
          variant="ghost"
          onClick={handleChooseFile}
          className="h-auto absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition"
        >
          Change
        </Button>
      </div>

      <form
        data-testid="profile-edit-form"
        className="flex flex-col gap-14 text-center w-full max-w-xl"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <ProfileEditForm form={form} disable={isPending} />
        {errorMessage && (
          <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default ProfileDisplay;
