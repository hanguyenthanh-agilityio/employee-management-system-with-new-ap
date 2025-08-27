'use client';

import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
import { Button, Checkbox, Label, TransitionLoader } from '@/components';
import { withValidation } from '@/utils/withValidation';
import {
  PasswordField,
  PasswordFieldProps,
} from '@/components/common/forms/PasswordField';
import {
  MaskedInputField,
  MaskedInputFieldProps,
} from '@/components/common/forms/MaskInputField';
import { InputField } from '@/components/common/forms/InputField';
import { InputFieldType } from '@/types/form';
import { cn } from '@/lib/utils';

const ValidatedInputField = withValidation<
  RegisterInput,
  HTMLInputElement,
  InputFieldType
>(InputField);

const ValidatedPasswordField = withValidation<
  RegisterInput,
  HTMLInputElement,
  PasswordFieldProps
>(PasswordField);

const ValidatedMaskedInputField = withValidation<
  RegisterInput,
  HTMLInputElement,
  MaskedInputFieldProps
>(MaskedInputField);

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
        {INPUT_FIELDS.map((field) => {
          if (field.name === 'masked') {
            return (
              <ValidatedMaskedInputField
                key={field.name}
                name={field.name}
                control={control}
                componentProps={{
                  label: field.label,
                  mask: field.mask!,
                  placeholder: field.placeholder,
                }}
              />
            );
          }

          if (field.name === 'password' || field.name === 'confirmPassword') {
            return (
              <ValidatedPasswordField
                key={field.name}
                name={field.name}
                control={control}
                componentProps={{
                  label: field.label,
                  containerClassName: 'col-span-1',
                  className: 'input-base',
                  placeholder: field.placeholder,
                  inputClassName: cn(
                    'input-normal',
                    'dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600',
                    'focus:border-primary',
                    'aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:border-red-500',
                  ),
                  labelClassName: 'label-base !mb-1 dark:text-gray-300',
                }}
              />
            );
          }

          return (
            <ValidatedInputField
              key={field.name}
              name={field.name}
              control={control}
              componentProps={{
                label: field.label,
                placeholder: field.placeholder,
                type: field.type,
                containerClassName: 'mb-4',
                inputClassName: cn(
                  'input-normal',
                  'dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600',
                  'focus:border-primary',
                  'aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:border-red-500',
                ),
                labelClassName: 'label-base !mb-1 dark:text-gray-300',
              }}
            />
          );
        })}

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
            className="h-auto w-full justify-center py-3 text-lg sm:text-xl my-2
             text-white bg-primary hover:bg-primary/90
             dark:bg-primary dark:hover:bg-primary/80 rounded-xl shadow-lg transition-all"
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
