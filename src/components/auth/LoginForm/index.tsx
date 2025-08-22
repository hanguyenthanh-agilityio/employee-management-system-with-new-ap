'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Css
import '@/styles/formStyle.css';
import '@/styles/labelStyle.css';

// REact Toast
import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Zod
import { zodResolver } from '@hookform/resolvers/zod';

// Actions
import { loginAction } from '@/actions/auth-action';

// Components
import { Button, Checkbox, Label, TransitionLoader } from '@/components';

// Utils
import { LoginInput, loginSchema } from '@/utils/schemas/authSchema';

// Constants
import { ROUTER, ERROR_MESSAGE, SUCCESS_MESSAGES } from '@/constants';
import { withValidation } from '@/utils/withValidation';
import {
  InputField,
  InputFieldProps,
} from '@/components/common/forms/InputField';
import {
  PasswordField,
  PasswordFieldProps,
} from '@/components/common/forms/PasswordField';

const ValidatedInputField = withValidation<
  LoginInput,
  HTMLInputElement,
  InputFieldProps
>(InputField);

const ValidatedPasswordField = withValidation<
  LoginInput,
  HTMLInputElement,
  PasswordFieldProps
>(PasswordField);

const LoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setServerError('');

    try {
      const result = await loginAction(undefined, data);

      if (result.success) {
        toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS, {
          autoClose: 1500,
          onClose: () => {
            setIsLoading(false);
            router.push(ROUTER.DASHBOARD);
          },
        });
      } else {
        setServerError(result.message || ERROR_MESSAGE.LOGIN_FAILED);
        toast.error(result.message || ERROR_MESSAGE.LOGIN_FAILED, {
          autoClose: 1500,
          onClose: () => setIsLoading(false),
        });
      }
    } catch {
      setServerError(ERROR_MESSAGE.UNEXPECTED);
      toast.error(ERROR_MESSAGE.UNEXPECTED, {
        autoClose: 1500,
        onClose: () => setIsLoading(false),
      });
    }
  };

  const isFormDisabled = isSubmitting || isLoading;

  return (
    <>
      {isFormDisabled && <TransitionLoader />}

      <h1 className="text-6xl md:text-7xl font-semibold text-primary mb-2">
        Login
      </h1>
      <p className="text-xl md:text-3xl text-gray-700 my-6">
        Login to your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <ValidatedInputField
          control={control}
          name="email"
          componentProps={{
            label: 'E-mail Address',
            type: 'text',
            placeholder: 'Enter your email',
            labelClassName: 'label-base !mb-0',
            inputClassName: 'input-normal',
          }}
        />

        <ValidatedPasswordField
          key="password"
          name="password"
          control={control}
          componentProps={{
            label: 'Password',
            containerClassName: 'col-span-1',
            className: 'input-base',
            placeholder: 'Enter your password',
            labelClassName: 'label-base !mb-0',
            inputClassName: 'input-normal',
          }}
        />

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

        {/* Server error */}
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
          className="h-auto w-full justify-center py-2 md:py-3 text-lg sm:text-xl my-2 text-white"
          disabled={isFormDisabled}
          aria-label="Submit login form"
        >
          {isFormDisabled ? 'Signing In...' : 'Sign In'}
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
