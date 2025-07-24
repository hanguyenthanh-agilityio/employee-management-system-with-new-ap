import { NEXT_PUBLIC_API_URL } from '@/constants';

export const getAvatarUrl = (
  avatar?: { url?: string }[] | string | File | null,
): string | undefined => {
  if (avatar instanceof File) {
    return URL.createObjectURL(avatar);
  }

  if (Array.isArray(avatar) && avatar.length > 0 && avatar[0].url) {
    return `${NEXT_PUBLIC_API_URL}${avatar[0].url}`;
  }

  if (typeof avatar === 'string') {
    return avatar;
  }

  return undefined;
};
