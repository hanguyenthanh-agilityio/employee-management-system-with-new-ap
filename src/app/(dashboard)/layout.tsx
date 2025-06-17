import { ReactNode } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Components
import { ToastProvider, TopBar } from '@/components';

// Constants
import { ROUTER } from '@/constants';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const token = (await cookies()).get('jwtToken')?.value;

  if (!token) {
    redirect(ROUTER.LOGIN);
  }

  return (
    <div className="min-h-screen flex flex-col bg-lavender">
      <TopBar />
      <main className="flex-grow">
        <div className="flex-grow container mx-auto px-4 sm:px-8 py-8">
          {children} <ToastProvider />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
