'use client';

import { Controller, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/Common/Button/button';
import { Input } from '@/components/ui/input';

// Utils
import { PersonalDetailsInput } from '@/utils/schemas/updateProfile';
import { Label } from '@/components/Common/Label/label';

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
      <div className="flex flex-col gap-4">
        <Label htmlFor="username" className="text-xl">
          Employee Name
        </Label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              id="username"
              className="text-center !text-3xl font-bold py-6"
              type="text"
              disabled={disable}
              error={errors.username?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="department" className="text-xl">
          Department
        </Label>
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <Input
              id="department"
              className="text-center !text-3xl font-bold py-6"
              type="text"
              disabled={disable}
              error={errors.department?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="mt-4 flex gap-10 lg:gap-24">
        <div className="flex flex-col gap-4">
          <Label htmlFor="jobTitle" className="text-xl">
            Job Title
          </Label>
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => (
              <Input
                id="jobTitle"
                className="text-center !text-3xl font-bold py-6"
                type="text"
                disabled={disable}
                error={errors.jobTitle?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="jobCategory" className="text-xl">
            Job Category
          </Label>
          <Controller
            name="jobCategory"
            control={control}
            render={({ field }) => (
              <Input
                id="jobCategory"
                className="text-center !text-3xl font-bold py-6"
                type="text"
                disabled={disable}
                error={errors.jobCategory?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="bg-darkGreen hover:bg-green-700 px-10 py-7 text-white text-2xl font-bold"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </>
  );
};

export default ProfileEditForm;
