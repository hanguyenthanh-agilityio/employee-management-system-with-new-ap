'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Avatar, Input, ProfileEditForm } from '@/components';
import { Button } from '@/components';

// Schemas
import {
  personalDetails,
  PersonalDetailsInput,
} from '@/utils/schemas/updateProfile';

// Hooks & Services
import { uploadFile } from '@/services/apiService';
import { useUpdatePersonalDetails } from '@/hooks/useProfile';

// Types
import { PersonalDetailsType } from '@/types/profile';

interface ProfileDisplayProps {
  avatarUrl?: string;
  profile: PersonalDetailsType;
}

const ProfileDisplay = ({ avatarUrl, profile }: ProfileDisplayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(avatarUrl);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<PersonalDetailsInput>({
    resolver: zodResolver(personalDetails),
    defaultValues: {
      username: profile.username,
      department: profile.department,
      jobTitle: profile.jobTitle,
      jobCategory: profile.jobCategory,
      avatar: undefined,
    },
  });

  const { handleSubmit, reset } = form;
  const { update, isPending } = useUpdatePersonalDetails();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
    setFile(selectedFile);
    form.setValue('avatar', selectedFile, { shouldDirty: true });
  };

  const handleChooseFile = () => inputRef.current?.click();

  const handleSubmitForm = async (data: PersonalDetailsInput) => {
    setErrorMessage('');

    let avatarId: string | null = null;

    try {
      if (file) {
        const uploaded = await uploadFile(file);
        avatarId = uploaded?.[0]?.id?.toString();
      }

      const payload = {
        ...data,
        ...(avatarId ? { avatar: avatarId } : {}),
      };

      const result = await update(payload, profile.id);

      if (result.success) {
        reset(data);
      } else {
        setErrorMessage(result.message || 'Update failed');
      }
    } catch (err) {
      console.error('[ERROR]', err);
      setErrorMessage('Something went wrong.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 p-6 w-full">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 mx-auto group">
        <Avatar name={profile.username} src={avatarUrl} preview={preview} />

        {/* Hidden input file */}
        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Overlay change button */}
        <Button
          type="button"
          variant="ghost"
          onClick={handleChooseFile}
          className="h-auto absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition"
        >
          Change
        </Button>
      </div>

      <form
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
