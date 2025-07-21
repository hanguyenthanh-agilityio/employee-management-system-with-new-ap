import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

// Constants
import { ERROR_MESSAGE } from '@/constants';

// Services
import { updateProfile, uploadFile } from '@/services/apiService';

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
      let documentId = data.documentId;

      // 👇 Upload avatar if it's a File
      if (data.avatar instanceof File) {
        documentId = await uploadFile(data.avatar);
      }

      // 👇 Prepare clean object to send
      const payload = {
        ...data,
        avatar: undefined, // remove avatar (File object can't be sent)
        documentId,
      };

      const result = await updateProfile(userId, payload);

      if (result.success) {
        startTransition(() => {
          router.refresh();
        });
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
