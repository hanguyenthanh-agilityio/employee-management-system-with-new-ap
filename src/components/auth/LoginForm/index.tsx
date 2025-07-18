'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

// REact Toast
import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Zod
import { zodResolver } from '@hookform/resolvers/zod';

// Actions
import { loginAction } from '@/actions/auth-action';

// Components
import { Button, Input, Checkbox } from '@/components';

// Utils
import { LoginInput, loginSchema } from '@/utils/schemas/authSchema';

// Constants
import { ROUTER, ERROR_MESSAGE, SUCCESS_MESSAGES } from '@/constants';

const LoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError('');
    try {
      const result = await loginAction(undefined, data);

      if (result.success) {
        toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS);

        router.push(ROUTER.DASHBOARD);
      } else {
        setServerError(result.message || ERROR_MESSAGE.LOGIN_FAILED);
        toast.error(result.message || ERROR_MESSAGE.LOGIN_FAILED);
      }
    } catch (error) {
      setServerError(ERROR_MESSAGE.UNEXPECTED);
      toast.error(ERROR_MESSAGE.UNEXPECTED);
    }
  };

  return (
    <>
      <h1 className="text-6xl md:text-7xl font-semibold text-primary mb-2">
        Login
      </h1>
      <p className="text-xl md:text-3xl text-muted my-6">
        Login to your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
          <Input
            label="E-mail Address"
            type="email"
            placeholder="Enter your email"
            // If the error has text, the screen reader will read the error when the user focuses on the input.
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
            labelClassName="block text-lg md:text-xl font-bold mb-3 text-primary"
            inputClassName={`w-full rounded-md px-4 py-2 text-primary shadow focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border border-red focus:ring-red'
                : 'focus:ring-secondary/30'
            }`}
          />
          {errors.email && (
            <p
              id="email-error"
              aria-live="polite"
              className="text-red text-sm mt-1"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
            labelClassName="block text-lg md:text-xl font-bold mb-3 text-primary"
            inputClassName={`w-full rounded-md px-4 py-2 text-primary shadow focus:outline-none focus:ring-2 ${
              errors.password
                ? 'border border-red focus:ring-red'
                : 'focus:ring-secondary/30'
            }`}
          />
          {errors.password && (
            <p
              id="password-error"
              aria-live="polite"
              className="text-red text-sm mt-1"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center text-sm">
          <Checkbox label="Remember me" id="remember" />
          <Link
            href="/reset-password"
            className="text-primary font-bold hover:underline"
            aria-label="Reset your password"
          >
            Reset Password?
          </Link>
        </div>

        {serverError && (
          <div
            className="text-red text-center text-lg font-medium"
            aria-live="polite"
          >
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          customClass="justify-center w-full"
          disabled={isSubmitting}
          aria-label="Submit login form"
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>

        <p className="text-center text-lg md:text-xl text-Gray56 mt-6">
          Don’t have an account yet?{' '}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline"
            aria-label="Register a new account"
          >
            Join KRIS today
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
