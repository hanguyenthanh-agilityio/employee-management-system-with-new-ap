'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProfileFormProps {
  profile: {
    name: string;
    department: string;
    jobTitle: string;
    jobCategory: string;
  };
}

const ProfileEditForm = ({ profile }: ProfileFormProps) => {
  const [formData] = useState(profile);

  const handleChange = () => {};

  return (
    <form
      data-testid="profile-edit-form"
      className="flex flex-col gap-14 text-center"
    >
      <div className="flex flex-col gap-4">
        <p className="text-xl">Employee Name</p>
        <Input
          className="text-center !text-3xl font-bold py-6"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xl">Department</p>
        <Input
          className="text-center !text-3xl font-bold py-6"
          value={formData.department}
          onChange={handleChange}
        />
      </div>

      <div className="mt-4 flex gap-10 lg:gap-24">
        <div className="flex flex-col gap-4">
          <p className="text-xl">Job Title</p>
          <Input
            className="text-center !text-3xl font-bold py-6"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xl">Job Category</p>
          <Input
            className="text-center !text-3xl font-bold py-6"
            value={formData.jobCategory}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="bg-darkGreen hover:bg-green-700 px-10 py-7 text-2xl font-bold"
      >
        Save
      </Button>
    </form>
  );
};

export default ProfileEditForm;
