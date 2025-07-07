import { PencilSquareIcon } from '@heroicons/react/24/solid';

// Components
import { Avatar, Button, InfoBlock } from '@/components';

interface ProfileDisplayProps {
  name: string;
  avatarName: string;
  department: string;
  jobTitle: string;
  jobCategory: string;
  avatarUrl: string;
  onEdit: () => void;
}

const ProfileDisplay = ({
  name,
  department,
  jobTitle,
  jobCategory,
  avatarName,
  avatarUrl,
  onEdit,
}: ProfileDisplayProps) => (
  <div className="relative flex flex-col items-center gap-10 p-6 w-full">
    <Button
      variant="none"
      customClass="absolute flex flex-col justify-center right-10 cursor-pointer text-gray-500"
      onClick={onEdit}
    >
      <PencilSquareIcon width={56} height={52} />
      <span>Edit</span>
    </Button>

    <Avatar src={avatarUrl} name={avatarName} />

    <div className="flex flex-col gap-14 text-center">
      <InfoBlock label="Employee Name" value={name} />
      <InfoBlock label="Department" value={department} />

      <div className="mt-4 flex gap-10 lg:gap-24">
        <InfoBlock label="Job Title" value={jobTitle} className="min-w-32" />
        <InfoBlock
          label="Job Category"
          value={jobCategory}
          className="min-w-32"
        />
      </div>
    </div>
  </div>
);

export default ProfileDisplay;
