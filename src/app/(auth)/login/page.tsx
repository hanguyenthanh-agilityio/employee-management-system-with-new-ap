import { Metadata } from 'next';

// Components
import LoginForm from '@/components/auth/LoginForm';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Login',
};

const LoginPage = async () => {
  return (
    <>
      <LoginForm />
      <ToastContainer />
    </>
  );
};

export default LoginPage;
