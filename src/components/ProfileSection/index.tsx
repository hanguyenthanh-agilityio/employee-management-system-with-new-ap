import Image from 'next/image';

// Components
import { Button } from '@/components';

// Constants
import { IMAGE } from '@/constants';

interface ProfileSectionProps {
  name: string;
  jobTitle: string;
}

const ProfileSection = ({ name, jobTitle }: ProfileSectionProps) => (
  <div className="flex flex-col justify-between bg-primary rounded-lg text-white py-4 pl-4 sm:pl-8 sm:py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div className="flex items-center">
      <Image
        src={IMAGE.PROFILE}
        alt="profile"
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
          variant="secondary"
          customClass="text-2xl px-14 py-4 rounded-[10px] font-bold w-full sm:w-auto text-center"
        >
          Edit Profile
        </Button>
      </div>

      <Image
        src={IMAGE.PLAN}
        alt="plan"
        width={250}
        height={190}
        className="object-contain"
      />
    </div>
  </div>
);

export default ProfileSection;
