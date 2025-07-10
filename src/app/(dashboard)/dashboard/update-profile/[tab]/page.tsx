'use client';

import { useParams } from 'next/navigation';

// Components
import {
  ContactDetailsForm,
  NotFoundMessage,
  ProfileDisplay,
} from '@/components';

// Constants
import { AVATAR_URL, TAB_ITEM } from '@/constants';

const TabPage = () => {
  const { tab } = useParams();

  switch (tab) {
    case TAB_ITEM.PERSONAL_DETAILS:
      return <ProfileDisplay avatarName="" avatarUrl={AVATAR_URL} />;
    case TAB_ITEM.CONTACT_DETAILS:
      return <ContactDetailsForm />;
  }

  return <NotFoundMessage title="Tabs not found" />;
};

export default TabPage;
