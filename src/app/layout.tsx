import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Components
import './globals.css';
import ToastProvider from '@/components/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'Next.js 14+ boilerplate app',
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
