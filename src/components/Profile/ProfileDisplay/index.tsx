'use client';

import { useEffect, useRef, useState } from 'react';
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

// Hooks
import { useUpdatePersonalDetails } from '@/hooks/useProfile';

// Types
import { PersonalDetailsType } from '@/types/profile';
import { getTokenFromCookies } from '@/utils/auth';
import { ERROR_MESSAGE } from '@/constants';

interface ProfileDisplayProps {
  url?: string;
  profile: PersonalDetailsType;
}

const ProfileDisplay = ({ url, profile }: ProfileDisplayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(url);
  const [avatarId, setAvatarId] = useState<string | null>(null);

  const avatarValue = profile.avatar;

  const avatarUrl =
    Array.isArray(avatarValue) && avatarValue[0]?.url
      ? `https://strapi-backend-o8eo.onrender.com${avatarValue[0].url}`
      : typeof avatarValue === 'string'
        ? avatarValue
        : undefined;

  useEffect(() => {
    const localPreview = localStorage.getItem('avatarPreview');
    const localId = localStorage.getItem('avatarId');

    if (localPreview) setPreview(localPreview);
    if (localId) setAvatarId(localId);
  }, []);

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
  const { updatePersonal, isPending, errorMessage } =
    useUpdatePersonalDetails();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      const token = await getTokenFromCookies();
      const formData = new FormData();
      formData.append('files', selectedFile);

      const res = await fetch(
        `https://strapi-backend-o8eo.onrender.com/api/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      const uploadedFile = data?.[0];
      const uploadedId = uploadedFile?.id?.toString();
      const uploadedUrl = uploadedFile?.url;

      if (uploadedId && uploadedUrl) {
        const fullUrl = `https://strapi-backend-o8eo.onrender.com${uploadedUrl}`;

        setAvatarId(uploadedId);
        setPreview(fullUrl);
        console.log('✅ Uploaded image URL:', uploadedUrl);

        localStorage.setItem('avatarPreview', fullUrl);
        localStorage.setItem('avatarId', uploadedId);
      }
    } catch (err) {
      return { success: false, message: ERROR_MESSAGE.UNKNOWN };
    }
  };

  const handleChooseFile = () => inputRef.current?.click();

  const handleSubmitForm = async (data: PersonalDetailsInput) => {
    const payload = {
      ...data,
      documentId: avatarId || profile.documentId,
      avatar: preview || avatarUrl,
    };

    const result = await updatePersonal(payload, profile.id);

    if (result.success) {
      reset(data);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 p-6 w-full">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 mx-auto group">
        <Avatar name={profile.username} url={avatarUrl} preview={preview} />

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
