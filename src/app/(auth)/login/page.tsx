import { Metadata } from 'next';

// Components
import { LoginForm } from '@/components';

export const metadata: Metadata = {
  title: 'Login',
};

const LoginPage = async () => {
  return <LoginForm />;
};

export default LoginPage;
