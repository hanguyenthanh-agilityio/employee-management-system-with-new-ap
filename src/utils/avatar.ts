import { NEXT_PUBLIC_API_URL } from '@/constants';

export const getAvatarUrl = (
  /**
   * file: upload from input
   * string: direct url
   * [{ url: string }]: API Strapi return
   */
  avatar?: { url?: string }[] | string | File | null,
): string | undefined => {
  if (avatar instanceof File) {
    // temporary object URL to display preview image before upload
    return URL.createObjectURL(avatar);
  }

  // API return avatar (Update profile form)
  if (Array.isArray(avatar) && avatar.length > 0 && avatar[0].url) {
    return `${NEXT_PUBLIC_API_URL}${avatar[0].url}`;
  }

  if (typeof avatar === 'string') {
    return avatar;
  }

  return undefined;
};
