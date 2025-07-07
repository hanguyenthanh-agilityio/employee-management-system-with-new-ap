// Components
import { Button } from '@/components/ui/button';

// Constants
import { TABS_SIDEBAR } from '@/constants';

interface ProfileSidebarProps {
  selected: string;
  onSelect: (tab: string) => void;
}

const ProfileSidebar = ({ selected, onSelect }: ProfileSidebarProps) => {
  return (
    <div className="w-full lg:w-[400px] flex flex-col gap-4 md:gap-6 p-4 bg-white rounded-lg shadow-sm">
      {TABS_SIDEBAR.map((tab) => (
        <Button
          key={tab}
          variant={selected === tab ? 'secondary' : 'outline'}
          onClick={() => onSelect(tab)}
          className={`justify-center px-10 py-6 text-xl rounded-lg transition ${
            selected === tab
              ? 'bg-yellow text-black font-bold hover:bg-yellow/90'
              : 'bg-lightBlue hover:bg-blue-200 text-black'
          }`}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};

export default ProfileSidebar;
