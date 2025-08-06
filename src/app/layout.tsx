import type { Metadata } from 'next';

// Fonts
import { productSans } from './fonts';

// Components
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';

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
  <html lang="en" suppressHydrationWarning>
    <body className={productSans.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
