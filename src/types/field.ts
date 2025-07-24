import { NEXT_PUBLIC_API_URL } from '@/constants';

export type SortField = 'employeeName' | 'startDate' | 'endDate' | 'type' | '';

type Document = {
  name: string;
  url: string;
};

export const getDefaultDocument = (
  document?: Document | null,
): { name: string; url: string } | undefined => {
  if (!document) return undefined;

  const url = document.url.startsWith('http')
    ? document.url
    : `${NEXT_PUBLIC_API_URL}${document.url}`;

  return {
    name: document.name,
    url,
  };
};
