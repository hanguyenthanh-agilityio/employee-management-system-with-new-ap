'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

// Components
import {
  Avatar,
  Input,
  ProfileEditForm,
  Button,
  TransitionLoader,
} from '@/components';

// Utils
import {
  personalDetails,
  PersonalDetailsInput,
} from '@/utils/schemas/updateProfile';
import { uploadFileToStrapi } from '@/utils/upload';
import { getAvatarUrl } from '@/utils/avatar';
import { formatName } from '@/utils/format';

// Hooks
import { useUpdateProfile } from '@/hooks/useProfile';

// Types
import { PersonalDetailsType } from '@/types/profile';

// Constants
import { ERROR_MESSAGE } from '@/constants';
import { profileFormFields } from '@/constants/inputField';

interface ProfileDisplayProps {
  avatarUrl?: string;
  profile: PersonalDetailsType;
}

const ProfileDisplay = ({ avatarUrl, profile }: ProfileDisplayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(avatarUrl);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PersonalDetailsInput>({
    resolver: zodResolver(personalDetails),
    defaultValues: {
      username: formatName(profile.username) ?? '',
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
    setIsLoading(true);

    try {
      const avatarId = file ? await uploadFileToStrapi(file) : null;

      const payload = {
        ...data,
        ...(avatarId && { avatar: avatarId }),
      };

      const result = await update(payload, profile.id);

      if (result.success) {
        reset(data);
        toast.success('Profile updated successfully!', {
          autoClose: 2000,
          onClose: () => setIsLoading(false),
        });
      } else {
        setErrorMessage(result.message || ERROR_MESSAGE.UPDATE_USER_FAIL);
        toast.error(result.message || ERROR_MESSAGE.UPDATE_USER_FAIL, {
          onClose: () => setIsLoading(false),
        });
      }
    } catch (err) {
      setErrorMessage(ERROR_MESSAGE.UNEXPECTED);
      toast.error(ERROR_MESSAGE.UNEXPECTED, {
        onClose: () => setIsLoading(false),
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 md:p-2 md:p-6 w-full">
      {/* Avatar */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto group rounded-full overflow-hidden">
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

        <div className="h-auto absolute inset-0 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            data-testid="change-button"
            type="button"
            onClick={handleChooseFile}
            className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold shadow hover:text-white"
            disabled={isPending}
          >
            Change
          </Button>
        </div>
      </div>

      {/* Form */}
      <form
        data-testid="profile-edit-form"
        onSubmit={handleSubmit(handleSubmitForm)}
        className="w-full max-w-xl mx-auto"
      >
        <fieldset
          disabled={isPending}
          className="space-y-4 md:space-y-8 opacity-100 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <ProfileEditForm fields={profileFormFields} form={form} />
        </fieldset>

        {(isPending || isLoading) && <TransitionLoader />}

        {errorMessage && (
          <p className="text-center text-red !text-sm mt-3 font-medium">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default ProfileDisplay;
