'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// Css
import '@/styles/formStyle.css';

// REact Toast
import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Zod
import { zodResolver } from '@hookform/resolvers/zod';

// Actions
import { loginAction } from '@/actions/auth-action';

// Components
import { Button, Checkbox, Input, Label } from '@/components';
import PasswordInput from '../PasswordInput';

// Utils
import { LoginInput, loginSchema } from '@/utils/schemas/authSchema';

// Constants
import { ROUTER, ERROR_MESSAGE, SUCCESS_MESSAGES } from '@/constants';
import { cn } from '@/lib/utils';

const LoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
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

  const inputClass = cn(
    'input-base',
    errors.email ? 'input-error' : 'input-normal',
  );

  return (
    <>
      <h1 className="text-6xl md:text-7xl font-semibold text-primary mb-2">
        Login
      </h1>
      <p className="text-xl md:text-3xl text-gray-700 my-6">
        Login to your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
          <Label
            htmlFor="email"
            className="block text-lg md:text-xl font-bold mb-3 text-primary"
          >
            E-mail Address
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                // If the error has text, the screen reader will read the error when the user focuses on the input.
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...field}
                disabled={isSubmitting}
                className={`${inputClass} h-auto py-3 border-[2px] border-mediumLightGray`}
                error={errors.email?.message}
              />
            )}
          />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="block text-lg md:text-xl font-bold mb-3 text-primary"
          >
            Password
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
                {...field}
                disabled={isSubmitting}
                className={inputClass}
                error={errors.password?.message}
              />
            )}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex justify-between items-center">
            <Checkbox
              id="remember"
              className="checkbox-base"
              disabled={isSubmitting}
            />
            <Label
              htmlFor="remember"
              className="flex items-center text-xl text-gray-600 space-x-2 pl-3 max-w-[400px]"
            >
              Remember me
            </Label>
          </div>
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
          className="justify-center w-full text-white"
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
