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

export const useUpdateProfile = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const update = async (
    userId: number,
    data: PersonalDetailsInput | ContactDetailsInput,
  ) => {
    setErrorMessage(null);

    const result = await updateProfile(userId, data);

    if (result.success) {
      startTransition(() => {
        router.refresh();
      });
    } else {
      setErrorMessage(result.message ?? ERROR_MESSAGE.UNKNOWN);
    }

    return result;
  };

  return {
    update,
    isPending,
    errorMessage,
  };
};
