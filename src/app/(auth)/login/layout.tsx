import { ReactNode } from 'react';

// Components
import { ToastProvider } from '@/components';

interface AuthLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: AuthLayoutProps) => (
  <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
    {/* Banner First on Mobile, Second on Desktop */}
    <section
      className="relative w-full h-96 md:h-full order-1 md:order-2"
      aria-label="Login banner"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary bg-[url(/login-banner.png)] bg-blend-multiply bg-cover bg-center bg-no-repeat z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-end justify-start p-6 sm:p-8 text-white h-full">
        <div className="space-y-6">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] leading-snug pb-10 md:pb-20">
            Manage all <span className="text-yellow">HR Operations</span>
            <br />
            from the comfort of your home.
          </h2>
          <div className="flex gap-3 pt-10 md:pt-20">
            <span className="w-16 md:w-20 h-2 md:h-3 bg-yellow rounded-full" />
            <span className="w-16 md:w-20 h-2 md:h-3 bg-white rounded-full" />
            <span className="w-16 md:w-20 h-2 md:h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </section>

    {/* Form Second on Mobile, First on Desktop */}
    <section
      className="flex flex-col justify-center px-6 sm:px-8 md:px-10 py-10 md:py-16 order-2 md:order-1"
      aria-label="Login form"
    >
      {children}
      <ToastProvider />
    </section>
  </main>
);

export default LoginLayout;
