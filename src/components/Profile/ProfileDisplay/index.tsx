// Components
import { Avatar, ProfileEditForm } from '@/components';

// Mocks
import { mockProfile } from '@/mocks/profile';

interface ProfileDisplayProps {
  avatarName: string;
  avatarUrl: string;
}

const ProfileDisplay = ({ avatarName, avatarUrl }: ProfileDisplayProps) => {
  return (
    <div className="flex flex-col items-center gap-10 p-6 w-full">
      <Avatar src={avatarUrl} name={avatarName} />

      <ProfileEditForm profile={mockProfile} />
    </div>
  );
};

export default ProfileDisplay;
