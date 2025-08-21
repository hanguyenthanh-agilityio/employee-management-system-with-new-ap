import { FieldConfig } from '@/types/field';
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';
import { PersonalDetailsInput } from '@/utils/schemas/updateProfile';

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

export const leaveFormFields: FieldConfig<LeaveApplicationInput>[] = [
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: true,
    colSpan: 1,
  },
  {
    name: 'endDate',
    label: 'End Date',
    type: 'date',
    required: true,
    colSpan: 1,
  },
  {
    name: 'durations',
    label: 'Duration (days)',
    type: 'number',
    required: true,
    readOnly: true,
    colSpan: 1,
  },
  {
    name: 'resumptionDate',
    label: 'Resumption Date',
    type: 'date',
    required: true,
    readOnly: true,
    colSpan: 1,
  },
  {
    name: 'reason',
    label: 'Reason for Leave',
    type: 'textarea',
    required: true,
    colSpan: 2,
  },
];

export const ProfileFormFields: FieldConfig<PersonalDetailsInput>[] = [
  {
    name: 'username',
    label: 'Employee Name',
    type: 'text',
    required: true,
    colSpan: 2,
  },
  {
    name: 'department',
    label: 'Department',
    type: 'text',
    required: true,
    colSpan: 2,
  },
  {
    name: 'jobTitle',
    label: 'Job Title',
    type: 'text',
    required: true,
    colSpan: 1,
  },
  {
    name: 'jobCategory',
    label: 'Job Category',
    type: 'text',
    required: true,
    colSpan: 1,
  },
];
