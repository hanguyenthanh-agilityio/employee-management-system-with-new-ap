import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Components
import './globals.css';
import ToastProvider from '@/components/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Employee Management System',
    default: 'Employee Management System',
  },
  description:
    'A centralized system to manage employee information, leave applications, and HR tasks efficiently.',
  icons: [
    {
      rel: 'icon',
      url: '/team-management.png',
    },
  ],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>
      {children} <ToastProvider />
    </body>
  </html>
);

export default RootLayout;
