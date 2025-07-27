import { ReactNode } from 'react';
import Image from 'next/image';

// Components
import { ToastProvider } from '@/components';

// Constants
import { IMAGE } from '@/constants';

const RegisterLayout = ({ children }: { children: ReactNode }) => (
  <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
    {/* Banner Section */}
    <section
      className="relative w-full h-[60vh] md:h-full"
      aria-label="Register banner"
    >
      {/* Image background */}
      <Image
        src={IMAGE.BANNER}
        alt="banner"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center z-10"
      />

      {/* Overlay (blend effect) */}
      <div className="absolute inset-0 bg-primary/80 z-20" />

      <div className="relative z-20 py-6 px-6 sm:px-10 text-white h-full flex flex-col justify-center">
        <Image
          src={IMAGE.LOGO}
          alt="Management System Logo"
          width={250}
          height={68}
          className="md:absolute md:top-[30px] md:left-[5px] object-contain width-[250px] h-auto w-auto"
          // LOGO is one of the LCPs if it is in the header
          priority
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
    </section>

    {/* Form Section */}
    <section
      className="flex flex-col justify-center px-6 sm:px-10 py-10 md:py-16"
      aria-label="Register form"
    >
      {children}
      <ToastProvider />
    </section>
  </main>
);

export default RegisterLayout;
