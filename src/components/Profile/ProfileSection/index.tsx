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
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Image */}
        <Image
          src={IMAGE.PROFILE}
          alt={`Profile picture of ${name}`}
          width={130}
          height={130}
          style={{ height: 'auto' }}
          className="rounded-full object-cover"
          priority
        />

        {/* Info */}
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-3xl font-bold pb-2 sm:pb-4">{name}</h2>
          <p className="text-xl sm:text-3xl">{jobTitle}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Button
          className="h-auto bg-[#FFC20E] text-[#000] hover:bg-yellow text-lg lg:text-2xl px-5 lg:px-10 py-2 lg:py-4 rounded-[10px] font-bold w-full sm:w-auto text-center"
          onClick={handleEditProfile}
        >
          Edit Profile
        </Button>

        <div className="relative w-full w-[150px] lg:w-[250px] h-[190px]">
          <Image
            src={IMAGE.PLAN}
            alt="User plan"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
