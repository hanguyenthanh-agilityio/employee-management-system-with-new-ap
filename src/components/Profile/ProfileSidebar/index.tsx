// Components
import { Button } from '@/components';

// Constants
import { TABS_SIDEBAR } from '@/constants';

const ProfileSidebar = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (tab: string) => void;
}) => {
  return (
    <div className="w-full lg:w-[400px] flex flex-col gap-4 md:gap-6 p-4 bg-white rounded-lg shadow-sm">
      {TABS_SIDEBAR.map((tab) => (
        <Button
          variant="none"
          key={tab}
          onClick={() => onSelect(tab)}
          customClass={`flex justify-center px-10 py-4 md:py-6 rounded-lg text-lg md:text-xl ${
            selected === tab
              ? 'bg-yellow text-black'
              : 'bg-lightBlue hover:bg-blue-200'
          }`}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};

export default ProfileSidebar;
