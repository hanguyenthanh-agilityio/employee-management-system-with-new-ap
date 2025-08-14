export type AvatarType = { url: string }[] | string | File | null | undefined;

export type PersonalDetailsType = {
  id: string;
  username: string;
  department: string;
  jobTitle: string;
  jobCategory: string;
  documentId?: string;
  avatar?: AvatarType;
};

export type ContactsDetailsType = {
  id: number;
  mainPhoneNumber: string;
  subPhoneNumber: string;
  email: string;
  city: string;
  residential: string;
};
