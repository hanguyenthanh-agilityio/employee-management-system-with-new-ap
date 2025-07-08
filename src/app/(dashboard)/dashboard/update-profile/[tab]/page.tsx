'use client';

import { ContactDetailsForm, ProfileDisplay } from '@/components';
import { AVATAR_URL } from '@/constants';
import { useParams } from 'next/navigation';

const TabPage = () => {
  const { tab } = useParams();

  switch (tab) {
    case 'personal-details':
      return <ProfileDisplay avatarName="" avatarUrl={AVATAR_URL} />;
    case 'contact-details':
      return <ContactDetailsForm />;
  }

  return <div>Tab not found</div>;
};

export default TabPage;
