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
  casual: 'Casual Leave',
};
