import { getTokenFromCookies } from '@/utils/auth';

export const uploadFile = async (file: File) => {
  const token = await getTokenFromCookies();

  const formData = new FormData();
  formData.append('files', file);

  const res = await fetch(
    'https://strapi-backend-o8eo.onrender.com/api/upload',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  if (!res.ok) {
    throw new Error('File upload failed');
  }

  const data = await res.json();
  return data?.[0]?.id;
};
