'use client';

import '@/styles/formStyle.css';
import { UseFormReturn } from 'react-hook-form';

// Components
import { Button, InputController } from '@/components';

// Utils
import { ContactDetailsInput } from '@/utils/schemas/updateProfile';

interface ContactDetailsFormProps {
  form: UseFormReturn<ContactDetailsInput>;
  disable: boolean;
}

const ContactDetailsForm = ({ form }: ContactDetailsFormProps) => {
  const {
    control,
    formState: { isDirty, isSubmitting },
  } = form;

  return (
    <>
      {/* Phone Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
        <InputController
          htmlFor="mainPhoneNumber"
          control={control}
          name="mainPhoneNumber"
          label="Phone Number 1"
          classNameLabel="form-label"
          as="masked"
          mask="099 999 9999"
          required
          classNameInput="input-profile"
        />

        <InputController
          htmlFor="subPhoneNumber"
          control={control}
          name="subPhoneNumber"
          label="Phone Number 2"
          classNameLabel="form-label"
          as="masked"
          required
          mask="099 999 9999"
          classNameInput="input-profile"
        />
      </div>

      {/* Email */}
      <InputController
        htmlFor="email"
        control={control}
        name="email"
        label="Email Address"
        classNameLabel="form-label"
        required
        classNameInput="input-profile"
      />

      {/* City */}
      <div className="w-full md:w-[50%]">
        <InputController
          htmlFor="city"
          control={control}
          name="city"
          label="City of Residence"
          classNameLabel="form-label"
          required
          classNameInput="input-profile"
        />
      </div>

      {/* Address */}
      <div className="w-full">
        <InputController
          htmlFor="residential"
          control={control}
          name="residential"
          as="textarea"
          rows={4}
          label="Residential Address"
          classNameLabel="form-label"
          required
          classNameInput="input-profile"
        />
      </div>

      {/* Submit */}
      <Button
        className="btn-primary btn-submit disabled:opacity-50 transition text-xl"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </>
  );
};

export default ContactDetailsForm;
