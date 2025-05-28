// export const API_URL = process.env.API_URL;
export const API_URL = 'http://localhost:1337/api';
export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API = {
  // LOGIN: '/accounts/login/',
  // REGISTER: '/accounts/register/',
  // ACTIVATE: '/accounts/activate/',
  // BASE: '/leave-applications/',
  // DOWNLOAD: '/leave-applications/download/',
  LOGIN: '/auth/local',
  REGISTER: '/auth/local/register',
  BASE: '/leave-applications',
  DOWNLOAD: '/leave-applications/export',
};
