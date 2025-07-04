import { ReactNode } from 'react';

// Components
import { TopBar } from '@/components';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-lavender">
      <TopBar />
      <main className="flex-grow">
        <div className="flex-grow container mx-auto px-4 sm:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
