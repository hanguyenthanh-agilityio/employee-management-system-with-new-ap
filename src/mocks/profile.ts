import { ContactsDetailsType, PersonalDetailsType } from '@/types/profile';

export const mockProfile: PersonalDetailsType = {
  id: '1',
  username: 'Biruk Dawit',
  department: 'Design & Marketing',
  jobTitle: 'UI / UX Designer',
  jobCategory: 'Full time',
};

export const mockContact: ContactsDetailsType = {
  id: 1,
  mainPhoneNumber: '0234567890',
  subPhoneNumber: '0123456789',
  email: 'hanguyen011019+3@gmail.com',
  city: 'Newyork',
  residential: 'residential',
};
