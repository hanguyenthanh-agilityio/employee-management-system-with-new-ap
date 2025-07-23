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

  const updatePersonal = async (data: PersonalDetailsInput, userId: string) => {
    try {
      const payload = {
        ...data,
      };
      const result = await updateProfile(userId, payload);

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

  return { updatePersonal, isPending, errorMessage };
};

export const useUpdateContactDetails = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateContact = async (data: ContactDetailsInput, userId: string) => {
    try {
      const result = await updateProfile(userId, {
        ...data,
      });

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

  return { updateContact, isPending, errorMessage };
};
