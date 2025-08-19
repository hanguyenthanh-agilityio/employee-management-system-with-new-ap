'use client';

import { UseFormReturn } from 'react-hook-form';

// Components
import { Button, FormInput, TransitionLoader } from '@/components';

// Types
import { PersonalDetailsInput } from '@/utils/schemas/updateProfile';

interface ProfileEditFormProps {
  form: UseFormReturn<PersonalDetailsInput>;
}

const ProfileEditForm = ({ form }: ProfileEditFormProps) => {
  const {
    control,
    formState: { isSubmitting, isDirty },
  } = form;

  return (
    <>
      {isSubmitting && <TransitionLoader />}
      {/* Username */}
      <div className="flex flex-col md:gap-2">
        <FormInput
          htmlFor="username"
          control={control}
          name="username"
          label="Employee Name"
          classNameLabel="form-label"
          required
          classNameInput="input-profile"
        />
      </div>

      {/* Department */}
      <div className="flex flex-col md:gap-2">
        <FormInput
          htmlFor="department"
          control={control}
          type="text"
          name="department"
          label="Department"
          classNameLabel="form-label"
          required
          classNameInput="input-profile"
        />
      </div>

      {/* Job title & category */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        <div className="flex-1 flex flex-col md:gap-2">
          <FormInput
            htmlFor="jobTitle"
            control={control}
            type="text"
            name="jobTitle"
            label="Job Title"
            classNameLabel="form-label"
            required
            classNameInput="input-profile"
          />
        </div>

        <div className="flex-1 flex flex-col md:gap-2">
          <FormInput
            htmlFor="jobCategory"
            control={control}
            type="text"
            name="jobCategory"
            label="Job Category"
            classNameLabel="form-label"
            required
            classNameInput="input-profile"
          />
        </div>
      </div>

      {/* Save button */}
      <Button
        type="submit"
        className="w-full btn-primary btn-submit disabled:opacity-50 transition text-xl"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </>
  );
};

export default ProfileEditForm;
