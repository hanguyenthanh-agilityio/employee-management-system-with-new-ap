import { ReactNode } from 'react';
import Image from 'next/image';

// Components
import { ToastProvider, TransitionLoader } from '@/components';

const RegisterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Banner First */}
      <div className="relative w-full h-[60vh] md:h-full">
        <div className="absolute inset-0 bg-primary bg-[url(/register-banner.png)] bg-blend-multiply bg-cover bg-center bg-no-repeat z-10" />

        <div className="relative z-20 py-6 px-6 sm:px-10 text-white h-full flex flex-col justify-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={250}
            height={68}
            className="md:absolute md:top-[30px] md:left-[5px]"
          />
          <div>
            <h2 className="text-2xl md:text-6xl font-bold leading-tight">
              HR Management Platform
            </h2>
            <div className="w-[100px] md:w-[140px] rounded-lg border-solid" />
            <p className="text-lg md:text-3xl py-2 md:py-4 leading-snug">
              Manage all employees, payrolls, and other HR tasks efficiently.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="text-lg md:text-2xl bg-yellow text-black font-bold px-6 md:px-10 py-2 md:py-4 rounded-[8px] md:rounded-[11px]">
                Learn More
              </button>
              <button className="text-lg md:text-2xl font-bold border-2 md:border-4 border-white px-6 md:px-10 py-2 md:py-4 rounded-[8px] md:rounded-[11px] hover:bg-white/10">
                Our Features
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Second */}
      <div className="flex flex-col justify-center px-6 sm:px-10 py-10 md:py-16">
        {children}
        <ToastProvider />
        <TransitionLoader />
      </div>
    </main>
  );
};

export default RegisterLayout;
