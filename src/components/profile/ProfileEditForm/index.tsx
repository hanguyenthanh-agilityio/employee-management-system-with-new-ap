'use client';

import { Controller, UseFormReturn } from 'react-hook-form';

// Components
import { Button, Input, RequiredLabel, TransitionLoader } from '@/components';

// Types
import { PersonalDetailsInput } from '@/utils/schemas/updateProfile';
import { cn } from '@/lib/utils';

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
      <div className="flex flex-col md:gap-2">
        <RequiredLabel htmlFor="username" className="form-label">
          Employee Name
        </RequiredLabel>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              id="username"
              className={cn(
                'input-base',
                errors.username ? 'input-error' : 'input-profile',
              )}
              type="text"
              disabled={disable}
              error={errors.username?.message}
              {...field}
            />
          )}
        />
      </div>

      {/* Department */}
      <div className="flex flex-col md:gap-2">
        <RequiredLabel htmlFor="department" className="form-label">
          Department
        </RequiredLabel>
        <Controller
          name="department"
          control={control}
          rules={{ required: 'Department is required' }}
          render={({ field }) => (
            <Input
              id="department"
              className={cn(
                'input-base',
                errors.department ? 'input-error' : 'input-profile',
              )}
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
        <div className="flex-1 flex flex-col md:gap-2">
          <RequiredLabel htmlFor="jobTitle" className="form-label">
            Job Title
          </RequiredLabel>
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => (
              <Input
                id="jobTitle"
                className={cn(
                  'input-base',
                  errors.jobTitle ? 'input-error' : 'input-profile',
                )}
                type="text"
                disabled={disable}
                error={errors.jobTitle?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="flex-1 flex flex-col md:gap-2">
          <RequiredLabel htmlFor="jobCategory" className="form-label">
            Job Category
          </RequiredLabel>
          <Controller
            name="jobCategory"
            control={control}
            render={({ field }) => (
              <Input
                id="jobCategory"
                className={cn(
                  'input-base',
                  errors.jobCategory ? 'input-error' : 'input-profile',
                )}
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
        className="w-full btn-primary btn-submit disabled:opacity-50 transition text-xl"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </>
  );
};

export default ProfileEditForm;
