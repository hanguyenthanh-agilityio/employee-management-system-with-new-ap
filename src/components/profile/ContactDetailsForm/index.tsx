'use client';

import '@/styles/formStyle.css';
import { Controller, UseFormReturn } from 'react-hook-form';

// Components
import { Button, Input, Textarea, RequiredLabel } from '@/components';
import MaskedInput from '@/components/common/MaskedInput';

// Utils
import { cn } from '@/lib/utils';
import { ContactDetailsInput } from '@/utils/schemas/updateProfile';

interface ContactDetailsFormProps {
  form: UseFormReturn<ContactDetailsInput>;
  disable: boolean;
}

const ContactDetailsForm = ({ form, disable }: ContactDetailsFormProps) => {
  const {
    control,
    formState: { errors, isDirty, isSubmitting },
  } = form;

  return (
    <>
      {/* Phone Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 w-full">
        <div>
          <RequiredLabel htmlFor="mainPhoneNumber" className="form-label">
            Phone Number 1
          </RequiredLabel>
          <Controller
            name="mainPhoneNumber"
            control={control}
            render={({ field }) => (
              <MaskedInput
                id="mainPhoneNumber"
                mask="999 999 9999"
                className={cn(
                  'input-base',
                  errors.mainPhoneNumber ? 'input-error' : 'input-profile',
                )}
                disabled={disable}
                error={errors.mainPhoneNumber?.message}
                {...field}
              />
            )}
          />
        </div>
        <div>
          <RequiredLabel htmlFor="subPhoneNumber" className="form-label">
            Phone Number 2
          </RequiredLabel>
          <Controller
            name="subPhoneNumber"
            control={control}
            render={({ field }) => (
              <MaskedInput
                id="subPhoneNumber"
                mask="999 999 9999"
                className={cn(
                  'input-base',
                  errors.subPhoneNumber ? 'input-error' : 'input-profile',
                )}
                disabled={disable}
                error={errors.subPhoneNumber?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <RequiredLabel htmlFor="email" className="form-label">
          Email Address
        </RequiredLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              id="email"
              className={cn(
                'input-base',
                errors.email ? 'input-error' : 'input-profile',
              )}
              disabled={disable}
              error={errors.email?.message}
              {...field}
            />
          )}
        />
      </div>

      {/* City */}
      <div className="w-full md:w-[50%]">
        <RequiredLabel htmlFor="city" className="form-label">
          City of Residence
        </RequiredLabel>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input
              id="city"
              className={cn(
                'input-base',
                errors.city ? 'input-error' : 'input-profile',
              )}
              disabled={disable}
              error={errors.city?.message}
              {...field}
            />
          )}
        />
      </div>

      {/* Address */}
      <div>
        <RequiredLabel htmlFor="residential" className="form-label">
          Residential Address
        </RequiredLabel>
        <Controller
          name="residential"
          control={control}
          render={({ field }) => (
            <Textarea
              id="residential"
              rows={4}
              className={cn(
                'textarea-base',
                errors.residential ? 'input-error' : 'input-profile',
              )}
              disabled={disable}
              error={errors.residential?.message}
              {...field}
            />
          )}
        />
      </div>

      {/* Submit */}
      <Button
        className="bg-darkGreen text-white hover:bg-green-700 font-bold py-6 md:py-8 text-lg md:text-2xl w-full md:w-[200px] mx-auto mt-4"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </>
  );
};

export default ContactDetailsForm;
