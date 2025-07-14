export const INPUT_FIELDS = [
  { label: 'First Name', name: 'firstName' },
  { label: 'Last Name', name: 'lastName' },
  { label: 'E-mail Address', type: 'email', name: 'email' },
  { label: 'Phone Number', name: 'phone' },
  { label: 'Password', type: 'password', name: 'password' },
  { label: 'Confirm Password', type: 'password', name: 'confirmPassword' },
];

export const CHECKBOXES = [
  {
    id: 'newsletter',
    label: 'Yes, I want to receive KRIS newsletters',
    name: 'newsletter',
  },
  {
    id: 'terms',
    label: 'I agree to all the ',
    subLabel: 'Terms, Privacy Policy',
    name: 'terms',
  },
];

export const TYPE_LABELS: Record<string, string> = {
  annual: 'Annual Leave',
  sick: 'Sick Leave',
  maternity: 'Maternity Leave',
  exam: 'Exam Leave',
};

export const AVATAR_URL =
  'https://images.icon-icons.com/3708/PNG/512/girl_female_woman_person_people_avatar_icon_230016.png';

export const TABS_SIDEBAR = [
  { label: 'Personal Details', tab: 'personal-details' },
  { label: 'Contact Details', tab: 'contact-details' },
];

export const ACTIONS = ['Leave Applications', 'Update Profile'];

export const TAB_ITEM = {
  PERSONAL_DETAILS: 'personal-details',
  CONTACT_DETAILS: 'contact-details',
};
