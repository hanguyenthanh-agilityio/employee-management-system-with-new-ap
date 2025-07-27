'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components';

// Constants
import { IMAGE, ROUTER } from '@/constants';

interface ProfileSectionProps {
  name: string;
  jobTitle: string;
}

const ProfileSection = ({ name, jobTitle }: ProfileSectionProps) => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push(ROUTER.EDIT_PERSONAL_DETAILS);
  };

  return (
    <div className="flex flex-col justify-between bg-primary rounded-lg text-white py-4 pl-4 sm:pl-8 sm:py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center">
        <Image
          src={IMAGE.PROFILE}
          alt={`Profile picture of ${name}`}
          width={130}
          height={130}
          className="rounded-full object-cover"
          priority
        />
        <div className="pl-6">
          <h2 className="md:text-3xl text-xl font-bold pb-4">{name}</h2>
          <p className="md:text-3xl text-xl">{jobTitle}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <Button
            className="h-auto bg-[#FFC20E] text-[#000] hover:bg-yellow text-2xl px-14 py-4 rounded-[10px] font-bold w-full sm:w-auto text-center"
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
        </div>

        <Image
          src={IMAGE.PLAN}
          alt="User plan"
          width={250}
          height={190}
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default ProfileSection;
