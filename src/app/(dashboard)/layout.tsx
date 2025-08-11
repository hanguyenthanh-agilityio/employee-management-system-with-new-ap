import { ReactNode } from 'react';

// Components
import { TopBar } from '@/components';
import { ToastContainer } from 'react-toastify';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <TopBar />
      <main className="pt-[80px] flex-grow">
        <div className="flex-grow container mx-auto px-4 sm:px-8 py-4 md:py-6 lg:py-8">
          {children}
          <ToastContainer position="top-right" autoClose={2000} />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
