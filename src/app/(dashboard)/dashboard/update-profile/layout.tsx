// Components
import { Breadcrumbs, ProfileSidebar } from '@/components';

// Constants
import { BREADCRUMBS } from '@/constants';

const UpdateProfileLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">
    <Breadcrumbs paths={BREADCRUMBS.PROFILE} />
    <div className="flex flex-col lg:flex-row gap-6">
      <ProfileSidebar />
      <div className="flex-1 bg-white p-4 md:p-6 rounded-lg shadow-md dark:bg-darkSecondary">
        {children}
      </div>
    </div>
  </div>
);

export default UpdateProfileLayout;
