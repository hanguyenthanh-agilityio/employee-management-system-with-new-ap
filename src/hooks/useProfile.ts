import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

// Constants
import { ERROR_MESSAGE } from '@/constants';

// Services
import { updateProfile } from '@/services/user/userService';

// Utils
import {
  ContactDetailsInput,
  PersonalDetailsInput,
} from '@/utils/schemas/updateProfile';

type ProfileInput = PersonalDetailsInput | ContactDetailsInput;

export const useUpdateProfile = () => {
  const router = useRouter();
  // useTransition(): Mark non-urgent tasks
  const [isPending, startTransition] = useTransition();

  // State to store errors if the API returns a failure or network error
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const update = async (data: ProfileInput, userId: string) => {
    try {
      const result = await updateProfile(userId, data);

      if (result.success) {
        // router.refresh() is non-blocking so should be placed in startTransition()
        startTransition(() => router.refresh());
      } else {
        // Show errors from API or default errors
        setErrorMessage(result.message ?? ERROR_MESSAGE.UNKNOWN);
      }

      return result;
      // In case: fetch fail, display default error
    } catch (error) {
      setErrorMessage(ERROR_MESSAGE.UNKNOWN);
      return { success: false, message: ERROR_MESSAGE.UNKNOWN };
    }
  };

  return { update, isPending, errorMessage, setErrorMessage };
};
