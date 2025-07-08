'use client';

// components
import { Breadcrumbs, ProfileDisplay, ProfileSidebar } from '@/components';

// Constants
import { AVATAR_URL, BREADCRUMBS } from '@/constants';

const UpdateProfilePage = () => {
  const handleSelect = () => {};

  return (
    <>
      <Breadcrumbs paths={BREADCRUMBS.PROFILE} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <ProfileSidebar selected="Personal Details" onSelect={handleSelect} />
          <div className="flex-1 bg-white p-3 md:p-6 rounded-lg shadow-md">
            <div className="flex justify-center">
              <ProfileDisplay avatarName="Biruk Dawit" avatarUrl={AVATAR_URL} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfilePage;
