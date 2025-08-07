'use client';

import { Controller, UseFormReturn } from 'react-hook-form';

// Components
import { Button, Input, RequiredLabel, TransitionLoader } from '@/components';

// Types
import { PersonalDetailsInput } from '@/utils/schemas/updateProfile';

interface ProfileEditFormProps {
  form: UseFormReturn<PersonalDetailsInput>;
  disable: boolean;
}

const ProfileEditForm = ({ form, disable }: ProfileEditFormProps) => {
  const {
    control,
    formState: { errors, isSubmitting, isDirty },
  } = form;

  return (
    <>
      {isSubmitting && <TransitionLoader />}
      {/* Username */}
      <div className="flex flex-col gap-2">
        <RequiredLabel htmlFor="username" className="form-label">
          Employee Name
        </RequiredLabel>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              id="username"
              className="h-auto w-full text-center !text-2xl font-bold border border-gray-300 rounded-md"
              type="text"
              disabled={disable}
              error={errors.username?.message}
              {...field}
            />
          )}
        />
      </div>

      {/* Department */}
      <div className="flex flex-col gap-2">
        <RequiredLabel htmlFor="department" className="form-label">
          Department
        </RequiredLabel>
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <Input
              id="department"
              className="h-auto w-full text-center !text-2xl font-bold border border-gray-300 rounded-md"
              type="text"
              disabled={disable}
              error={errors.department?.message}
              {...field}
            />
          )}
        />
      </div>

      {/* Job title & category */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        <div className="flex-1 flex flex-col gap-2">
          <RequiredLabel htmlFor="jobTitle" className="form-label">
            Job Title
          </RequiredLabel>
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => (
              <Input
                id="jobTitle"
                className="h-auto w-full text-center !text-2xl font-bold border border-gray-300 rounded-md"
                type="text"
                disabled={disable}
                error={errors.jobTitle?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <RequiredLabel htmlFor="jobCategory" className="form-label">
            Job Category
          </RequiredLabel>
          <Controller
            name="jobCategory"
            control={control}
            render={({ field }) => (
              <Input
                id="jobCategory"
                className="h-auto w-full text-center !text-2xl font-bold border border-gray-300 rounded-md"
                type="text"
                disabled={disable}
                error={errors.jobCategory?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>

      {/* Save button */}
      <Button
        type="submit"
        className="w-full bg-darkGreen hover:bg-green-700 text-white text-lg py-3 rounded-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </>
  );
};

export default ProfileEditForm;
