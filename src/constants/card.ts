import { ROUTER } from './router';

export const birthdays = [
  { name: 'biruk kidan', date: 'April 25th' },
  { name: 'biruk kidan', date: 'April 25th' },
  { name: 'biruk kidan', date: 'April 25th' },
  { name: 'biruk kidan', date: 'April 25th' },
  { name: 'biruk kidan', date: 'April 25th' },
];

export const leaves = [
  { title: 'Annual Leave', days: 60 },
  { title: 'Sick Leave', days: 20 },
  { title: 'Maternity Leave', days: 60 },
  { title: 'Compassionate Leave', days: 30 },
];

export const leaveData = [
  { label: 'Annual Leave', current: 10, total: 60 },
  { label: 'Sick Leave', current: 0, total: 10 },
  { label: 'Compassionate Leave', current: 8, total: 15 },
];

export const listItem = [
  { name: 'Dashboard', href: ROUTER.DASHBOARD },
  { name: 'Requests', href: ROUTER.REQUESTS },
  { name: 'Payroll', href: ROUTER.PAYROLL },
  { name: 'Company', href: ROUTER.COMPANY },
  { name: 'Extras', href: ROUTER.EXTRAS },
];
