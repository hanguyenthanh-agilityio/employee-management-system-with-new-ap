'use client';

import Link from 'next/link';

// Constants
import { ROUTER } from '@/constants';

// Component
import { RegisterForm } from '@/components';

const RegisterPage = () => (
  <>
    {/* Header */}
    <h1 className="text-5xl sm:text-7xl font-semibold text-primary mb-2 leading-[normal]">
      Welcome to XCELTECH
    </h1>
    <p className="text-xl sm:text-3xl text-muted my-4 sm:my-6">
      Register your account
    </p>

    {/* Register Form */}
    <RegisterForm />

    {/* Footer */}
    <p className="text-lg sm:text-xl text-Gray56 mt-6 sm:mt-8">
      Already have an account?{' '}
      <Link href={ROUTER.LOGIN} className="text-primary font-bold">
        Log In
      </Link>
    </p>
  </>
);

export default RegisterPage;
