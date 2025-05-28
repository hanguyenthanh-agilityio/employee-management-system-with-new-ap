import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Components
import { LoginForm } from '@/components';

const LoginPage = async () => {
  const token = (await cookies()).get('jwtToken')?.value;

  if (token) {
    redirect('/leave-applications');
  }

  return <LoginForm />;
};

export default LoginPage;
