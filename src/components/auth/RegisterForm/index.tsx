'use client';

import { Controller, useForm } from 'react-hook-form';
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
import { ROUTER, ERROR_MESSAGE, CHECKBOXES, INPUT_FIELDS } from '@/constants';

// Components
import { Input, Button, Checkbox, Label } from '@/components';

const RegisterForm = () => {
  const router = useRouter();

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
      newsletter: false,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    const result = await registerAction(data);

    if (result.success) {
      toast.success('Account created successfully!');
      router.push(ROUTER.LOGIN);
    } else {
      toast.error(result.message || ERROR_MESSAGE.REGISTER_FAILED);
    }
  };

  const watchedNewsletter = watch('newsletter');
  const watchedTerms = watch('terms');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
    >
      {/* INPUT FIELDS */}
      {INPUT_FIELDS.map((field) => (
        <div key={field.name}>
          <Label
            htmlFor={field.name}
            className="block text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-primary"
          >
            {field.label}
          </Label>

          <Controller
            name={field.name as keyof RegisterInput}
            control={control}
            render={({ field: controllerField }) => {
              const value = controllerField.value ?? '';
              return (
                <Input
                  id={field.name}
                  type={field.type || 'text'}
                  className={`h-auto rounded-md px-4 py-2 text-primary shadow focus:outline-none focus:ring-2 border-[2px] border-mediumLightGray !text-lg ${
                    errors[field.name as keyof RegisterInput]
                      ? 'border border-red focus:ring-red'
                      : 'focus:ring-secondary/30'
                  }`}
                  {...controllerField}
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
                    className="form-checkbox w-[20px] h-[20px] text-white border-[2px] border-mediumLightGray"
                  />
                  <Label className="text-sm md:text-xl text-Gray56">
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

      {/* SUBMIT */}
      <div className="col-span-1 md:col-span-2">
        <Button
          type="submit"
          className="h-auto w-full sm:max-w-[300px] justify-center py-2 md:py-3 text-lg sm:text-xl my-2 text-white"
          disabled={isSubmitting || !watchedNewsletter || !watchedTerms}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
