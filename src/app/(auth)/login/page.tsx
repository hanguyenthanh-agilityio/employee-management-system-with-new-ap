import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Components
import { LoginForm } from '@/components';

// Constants
import { API } from '@/constants';

export const metadata: Metadata = {
  title: 'Login',
};

const LoginPage = async () => {
  const token = (await cookies()).get('jwtToken')?.value;

  if (token) {
    redirect(API.BASE);
  }

  return <LoginForm />;
};

export default LoginPage;
