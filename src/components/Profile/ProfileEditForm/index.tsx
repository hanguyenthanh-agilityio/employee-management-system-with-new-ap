'use client';

import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Utils
import { PersonalDetailsInput } from '@/utils/schemas/updateProfile';

interface ProfileEditFormProps {
  form: UseFormReturn<PersonalDetailsInput>;
}

const ProfileEditForm = ({ form }: ProfileEditFormProps) => {
  const {
    register,
    formState: { errors, isSubmitting, isDirty },
  } = form;

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-xl">Employee Name</p>
        <Input
          className="text-center !text-3xl font-bold py-6"
          type="text"
          {...register('username')}
          error={errors.username?.message}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xl">Department</p>
        <Input
          className="text-center !text-3xl font-bold py-6"
          type="text"
          {...register('department')}
          error={errors.department?.message}
        />
      </div>

      <div className="mt-4 flex gap-10 lg:gap-24">
        <div className="flex flex-col gap-4">
          <p className="text-xl">Job Title</p>
          <Input
            className="text-center !text-3xl font-bold py-6"
            type="text"
            {...register('jobTitle')}
            error={errors.jobTitle?.message}
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xl">Job Category</p>
          <Input
            className="text-center !text-3xl font-bold py-6"
            type="text"
            {...register('jobCategory')}
            error={errors.jobCategory?.message}
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
