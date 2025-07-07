// Components
import { Avatar } from '@/components';
import ProfileEditForm from '../ProfileEditForm';

interface ProfileDisplayProps {
  avatarName: string;
  avatarUrl: string;
}

const ProfileDisplay = ({ avatarName, avatarUrl }: ProfileDisplayProps) => {
  return (
    <div className="flex flex-col items-center gap-10 p-6 w-full">
      <Avatar src={avatarUrl} name={avatarName} />

      <form>
        <ProfileEditForm />
      </form>
    </div>
  );
};

export default ProfileDisplay;
