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
    <div className="flex flex-col md:flex-row lg:flex-row justify-center md:justify-between items-center bg-primary rounded-lg text-white p-4 sm:p-6 lg:p-8 gap-y-6 gap-x-12">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Image */}
        <div className="relative w-24 h-24 sm:w-[130px] sm:h-[130px] rounded-full overflow-hidden shrink-0">
          <Image
            src={IMAGE.PROFILE}
            alt={`Profile picture of ${name}`}
            fill
            sizes="130px"
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="text-center sm:text-left max-w-xs">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold pb-1 sm:pb-2">
            {name}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl w-full">{jobTitle}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto justify-between">
        <Button
          className="bg-[#FFC20E] text-black hover:bg-yellow text-base sm:text-lg lg:text-xl px-4 sm:px-6 lg:px-10 py-2 lg:py-4 rounded-[10px] font-bold w-full sm:w-auto"
          onClick={handleEditProfile}
        >
          Edit Profile
        </Button>

        <div className="relative hidden sm:block w-[150px] lg:w-[250px] h-[190px]">
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
