'use server';

import { getTokenFromCookies } from '@/utils/auth';

type FetchWithAuthOptions = RequestInit & {
  revalidateTags?: string[];
  skipJson?: boolean;
};

/**
 * Generic fetch with Bearer token
 */
export const fetchWithAuth = async (
  url: string,
  options: FetchWithAuthOptions = {},
) => {
  const token = await getTokenFromCookies();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  const res = await fetch(url, {
    ...options,
    headers,
    next:
      options.method === 'GET' && options.revalidateTags
        ? { tags: options.revalidateTags, revalidate: 3600 }
        : undefined,
  });

  if (!res.ok) {
    const contentType = res.headers.get('Content-Type');
    const errorText = contentType?.includes('application/json')
      ? JSON.stringify(await res.json())
      : await res.text();
    throw new Error(`API Error ${res.status}: ${errorText || 'Unknown error'}`);
  }

  if (options.skipJson) return res;

  const contentType = res.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }

  return null;
};
