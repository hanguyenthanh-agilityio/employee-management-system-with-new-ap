'use server';

// Constants
import { API_URL } from '@/constants';

// Auth
import { getTokenFromCookies } from '@/utils/auth';

// Upload file
export const uploadFile = async (file: File) => {
  const token = await getTokenFromCookies();

  const formData = new FormData();
  formData.append('files', file);

  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Upload document fail');
  }

  const uploadRes = await res.json();
  console.log('Upload success:', uploadRes[0].id);
  return uploadRes[0]?.id;
};
