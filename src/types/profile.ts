export type PersonalDetailsType = {
  id: string;
  username: string;
  department: string;
  jobTitle: string;
  jobCategory: string;
  documentId?: string;
  avatar?: string | File | null;
};

export type ContactsDetailsType = {
  id: number;
  mainPhoneNumber: string;
  subPhoneNumber: string;
  email: string;
  city: string;
  residential: string;
};
