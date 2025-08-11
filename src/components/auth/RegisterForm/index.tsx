'use client';

import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Css
import '@/styles/formStyle.css';
// Toast
import { toast } from 'react-toastify';

// Actions
import { registerAction } from '@/actions/auth-action';

// Utils
import { registerSchema, RegisterInput } from '@/utils/schemas/authSchema';

// Hooks
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { ROUTER, ERROR_MESSAGE, CHECKBOXES, INPUT_FIELDS } from '@/constants';

// Components
import {
  Input,
  Button,
  Checkbox,
  Label,
  TransitionLoader,
  RequiredLabel,
} from '@/components';
import PasswordInput from '../PasswordInput';
import MaskedInput from '@/components/common/MaskedInput';

const RegisterForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setServerError('');

    try {
      const result = await registerAction(data);

      if (result.success) {
        toast.success('Account created successfully!', {
          autoClose: 1500,
          onClose: () => {
            setIsLoading(false);
            router.push(ROUTER.LOGIN);
          },
        });
      } else {
        toast.error(result.message || ERROR_MESSAGE.REGISTER_FAILED, {
          autoClose: 1500,
          onClose: () => setIsLoading(false),
        });
      }
    } catch {
      toast.error(ERROR_MESSAGE.UNEXPECTED, {
        autoClose: 1500,
        onClose: () => setIsLoading(false),
      });
    }
  };

  const watchedTerms = watch('terms');
  const isFormDisabled = isSubmitting || isLoading;

  return (
    <>
      {isLoading && <TransitionLoader />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pointer-events-auto"
      >
        {/* INPUT FIELDS */}
        {INPUT_FIELDS.map((field) => (
          <div key={field.name}>
            <RequiredLabel
              htmlFor={field.name}
              className="block text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-primary"
            >
              {field.label}
            </RequiredLabel>

            <Controller
              name={field.name as keyof RegisterInput}
              control={control}
              render={({ field: controllerField }) => {
                const value = controllerField.value ?? '';
                const isError = !!errors[field.name as keyof RegisterInput];
                const inputClassName = cn(
                  'input-base',
                  isError ? 'input-error' : 'input-normal',
                );

                if (field.name === 'phone') {
                  return (
                    <MaskedInput
                      id={field.name}
                      mask="099 999 9999"
                      className={`${inputClassName} py-3 h-auto border-[2px] border-mediumLightGray`}
                      {...controllerField}
                      value={typeof value === 'string' ? value : ''}
                      error={errors[field.name as keyof RegisterInput]?.message}
                      disabled={isFormDisabled}
                    />
                  );
                }

                if (
                  field.name === 'password' ||
                  field.name === 'confirmPassword'
                ) {
                  return (
                    <PasswordInput
                      id={field.name}
                      aria-label={
                        field.name === 'password'
                          ? 'Password'
                          : field.name === 'confirmPassword'
                            ? 'Confirm Password'
                            : undefined
                      }
                      className={inputClassName}
                      {...controllerField}
                      value={typeof value === 'string' ? value : ''}
                      error={errors[field.name as keyof RegisterInput]?.message}
                      disabled={isFormDisabled}
                    />
                  );
                }

                return (
                  <Input
                    id={field.name}
                    type={field.type || 'text'}
                    className={`${inputClassName} py-3 h-auto border-[2px] border-mediumLightGray`}
                    {...controllerField}
                    disabled={isFormDisabled}
                    value={typeof value === 'string' ? value : ''}
                    error={errors[field.name as keyof RegisterInput]?.message}
                  />
                );
              }}
            />
          </div>
        ))}

        {/* CHECKBOXES */}
        <div className="col-span-1 md:col-span-2 space-y-2 pt-4">
          {CHECKBOXES.map((cb) => (
            <div key={cb.id}>
              <Controller
                name={cb.name as keyof RegisterInput}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={cb.id}
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      disabled={isFormDisabled}
                      className="checkbox-base"
                    />
                    <Label
                      htmlFor={cb.id}
                      className="text-sm md:text-xl text-gray-700"
                    >
                      {cb.label}
                      <span className="text-primary ml-1">{cb.subLabel}</span>
                    </Label>
                  </div>
                )}
              />
              {errors[cb.name as keyof RegisterInput]?.message && (
                <p className="text-red text-sm mt-1">
                  {errors[cb.name as keyof RegisterInput]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ERROR */}
        {serverError && (
          <div className="col-span-2 text-red text-center font-medium">
            {serverError}
          </div>
        )}

        {/* SUBMIT */}
        <div className="col-span-1 md:col-span-2">
          <Button
            type="submit"
            className="h-auto w-full sm:max-w-[300px] justify-center py-2 md:py-3 text-lg sm:text-xl my-2 text-white"
            disabled={isFormDisabled || !watchedTerms}
          >
            {isFormDisabled ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
