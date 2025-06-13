import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Components
import { LoginForm } from '@/components';

// Constants
import { API } from '@/constants';

const LoginPage = async () => {
  const token = (await cookies()).get('jwtToken')?.value;

  if (token) {
    redirect(API.BASE);
  }

  return <LoginForm />;
};

export default LoginPage;
