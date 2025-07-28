import { Metadata } from 'next';

// Components
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
};

const LoginPage = async () => {
  return <LoginForm />;
};

export default LoginPage;
