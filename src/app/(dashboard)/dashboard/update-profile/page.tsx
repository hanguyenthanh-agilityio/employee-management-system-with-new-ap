'use client';

// components
import {
  Breadcrumbs,
  ProfileDisplay,
  ProfileSidebar,
  ContactDetailsForm,
} from '@/components';

// Constants
import { AVATAR_URL, BREADCRUMBS } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const UpdateProfilePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [selectedTab, setSelectedTab] = useState(
    tabParam || 'Personal Details',
  );

  const handleSelect = (tab: string) => {
    setSelectedTab(tab);

    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', tab);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <>
      <Breadcrumbs paths={BREADCRUMBS.PROFILE} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <ProfileSidebar selected={selectedTab} onSelect={handleSelect} />
          <div className="flex-1 bg-white p-4 md:p-6 rounded-lg shadow-md">
            {selectedTab === 'Personal Details' && (
              <div className="flex justify-center">
                <ProfileDisplay
                  avatarName="Biruk Dawit"
                  avatarUrl={AVATAR_URL}
                />
              </div>
            )}
            {selectedTab === 'Contact Details' && <ContactDetailsForm />}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfilePage;
