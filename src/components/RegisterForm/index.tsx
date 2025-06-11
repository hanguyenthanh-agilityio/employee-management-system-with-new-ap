'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

// Toast message
import { toast } from 'react-toastify';

// Actions
import { registerAction } from '@/actions/auth-action';

// Utils
import { registerSchema, RegisterInput } from '@/utils/schemas/authSchema';

// Hooks
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { ROUTER, ERROR_MESSAGE } from '@/constants';

// Components
import { Input, Checkbox, Button } from '@/components';

const inputFields = [
  { label: 'First Name', name: 'firstName' },
  { label: 'Last Name', name: 'lastName' },
  { label: 'E-mail Address', type: 'email', name: 'email' },
  { label: 'Phone Number', name: 'phone' },
  { label: 'Password', type: 'password', name: 'password' },
  { label: 'Confirm Password', type: 'password', name: 'confirmPassword' },
];

const checkboxes = [
  {
    id: 'newsletter',
    label: 'Yes, I want to receive KRIS newsletters',
    name: 'newsletter',
  },
  {
    id: 'terms',
    label: 'I agree to all the ',
    subLabel: 'Terms, Privacy Policy',
    name: 'terms',
  },
];

const RegisterForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      newsletter: false,
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError('');

    const result = await registerAction(data);
    if (result.success) {
      toast.success('Account created successfully!');
      router.push(ROUTER.LOGIN);
    } else {
      setServerError(result.message || ERROR_MESSAGE.REGISTER_FAILED);
      toast.error(result.message || ERROR_MESSAGE.REGISTER_FAILED);
    }
  };

  const watchedNewsletter = watch('newsletter');
  const watchedTerms = watch('terms');

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
      >
        {inputFields.map((field) => (
          <div key={field.name}>
            <Input
              label={field.label}
              type={field.type}
              {...registerForm(field.name as keyof RegisterInput)}
              inputClassName={`rounded-md px-4 py-2 text-primary shadow focus:outline-none focus:ring-2 ${
                errors[field.name as keyof RegisterInput]
                  ? 'border border-red focus:ring-red'
                  : 'focus:ring-secondary/30'
              }`}
              labelClassName="block text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-primary"
            />
            {errors[field.name as keyof RegisterInput]?.message && (
              <p className="text-red text-sm mt-1">
                {errors[field.name as keyof RegisterInput]?.message}
              </p>
            )}
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 space-y-2 pt-4">
          {checkboxes.map((cb) => (
            <div key={cb.id}>
              <Checkbox
                id={cb.id}
                label={cb.label}
                subLabel={cb.subLabel}
                {...registerForm(cb.name as keyof RegisterInput)}
              />
              {errors[cb.name as keyof RegisterInput] && (
                <p className="text-red text-sm mt-1">
                  {errors[cb.name as keyof RegisterInput]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        {serverError && (
          <div className="text-red text-center text-lg font-medium">
            {serverError}
          </div>
        )}

        <div className="col-span-1 md:col-span-2">
          <Button
            type="submit"
            customClass="w-full sm:max-w-[300px] justify-center py-2 md:py-3 text-lg sm:text-xl my-2"
            disabled={isSubmitting || !watchedNewsletter || !watchedTerms}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
