import { ERROR_MESSAGE, NEXT_PUBLIC_API_URL } from '@/constants';
import { getTokenFromCookies } from '@/utils/auth';

export const uploadFileToStrapi = async (
  file: File,
): Promise<string | null> => {
  if (!file) return null;

  const token = await getTokenFromCookies();
  const formData = new FormData();
  formData.append('files', file);

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.UPLOAD_FAILED);
  }

  const data = await response.json();
  return data?.[0]?.id?.toString() || null;
};
