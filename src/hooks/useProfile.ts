import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { ERROR_MESSAGE } from '@/constants';
import { updateProfile } from '@/services/apiService';
import {
  ContactDetailsInput,
  PersonalDetailsInput,
} from '@/utils/schemas/updateProfile';

type ProfileInput = PersonalDetailsInput | ContactDetailsInput;

export const useUpdateProfile = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const update = async (data: ProfileInput, userId: string) => {
    try {
      const result = await updateProfile(userId, data);

      if (result.success) {
        startTransition(() => router.refresh());
      } else {
        setErrorMessage(result.message ?? ERROR_MESSAGE.UNKNOWN);
      }

      return result;
    } catch (error) {
      setErrorMessage(ERROR_MESSAGE.UNKNOWN);
      return { success: false, message: ERROR_MESSAGE.UNKNOWN };
    }
  };

  return { update, isPending, errorMessage };
};
