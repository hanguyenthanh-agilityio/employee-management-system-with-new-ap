export const inputFields = [
  { label: 'First Name', name: 'firstName' },
  { label: 'Last Name', name: 'lastName' },
  { label: 'E-mail Address', type: 'email', name: 'email' },
  { label: 'Phone Number', name: 'phone' },
  { label: 'Password', type: 'password', name: 'password' },
  { label: 'Confirm Password', type: 'password', name: 'confirmPassword' },
];

export const ALLOWED_LEAVE_TYPES = [
  'Annual Leave',
  'Sick Leave',
  'Maternity Leave',
  'Exam Leave',
] as const;

export type LeaveType = (typeof ALLOWED_LEAVE_TYPES)[number];
