import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

// Constants
import { ERROR_MESSAGE } from '@/constants';

// Services
import { updateProfile } from '@/services/apiService';

// Utils
import {
  ContactDetailsInput,
  PersonalDetailsInput,
} from '@/utils/schemas/updateProfile';

export const useUpdatePersonalDetails = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const update = async (data: PersonalDetailsInput, userId: string) => {
    try {
      const result = await updateProfile(userId, {
        ...data,
        avatar: undefined,
      });

      if (result.success) {
        startTransition(() => router.refresh());
      } else {
        setErrorMessage(result.message ?? ERROR_MESSAGE.UNKNOWN);
      }

      return result;
    } catch (error) {
      console.error('Update failed:', error);
      setErrorMessage(ERROR_MESSAGE.UNKNOWN);
      return { success: false, message: ERROR_MESSAGE.UNKNOWN };
    }
  };

  return { update, isPending, errorMessage };
};

export const useUpdateContactDetails = async (
  data: ContactDetailsInput,
  userId: string,
) => {
  return await updateProfile(userId, data);
};
