import { Metadata } from 'next';
import Link from 'next/link';

// Constants
import { ROUTER } from '@/constants';
import dynamic from 'next/dynamic';

// Component
const RegisterForm = dynamic(() => import('@/components/auth/RegisterForm'));
export const metadata: Metadata = {
  title: 'Register',
};

const RegisterPage = () => (
  <>
    {/* Header */}
    <h1 className="text-5xl sm:text-7xl font-semibold text-primary mb-2 leading-[normal] dark:text-white">
      Welcome to XCELTECH
    </h1>
    <p className="text-xl sm:text-3xl text-gray-600 my-4 sm:my-6 dark:text-gray-300">
      Register your account
    </p>

    {/* Register Form */}
    <RegisterForm />

    {/* Footer */}
    <p className="text-lg sm:text-xl text-gray-600 mt-6 sm:mt-8">
      Already have an account?{' '}
      <Link href={ROUTER.LOGIN} className="text-primary font-bold">
        Log In
      </Link>
    </p>
  </>
);

export default RegisterPage;
