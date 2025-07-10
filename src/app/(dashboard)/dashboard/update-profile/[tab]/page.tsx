import { Suspense } from 'react';

// Components
import {
  LoadingFormLeave,
  ContactDetailsForm,
  NotFoundMessage,
  ProfileDisplay,
} from '@/components';

// Constants
import { TAB_ITEM } from '@/constants';

// Services
import { getCurrentUser } from '@/services/apiService';

interface Props {
  params: { tab: string };
}

const PersonalDetailsContent = async () => {
  const userData = await getCurrentUser();

  return <ProfileDisplay profile={userData} avatarName={userData.username} />;
};

const TabPage = async ({ params }: Props) => {
  const { tab } = params;

  switch (tab) {
    case TAB_ITEM.PERSONAL_DETAILS:
      return (
        <Suspense fallback={<LoadingFormLeave />}>
          <PersonalDetailsContent />
        </Suspense>
      );

    case TAB_ITEM.CONTACT_DETAILS:
      return <ContactDetailsForm />;

    default:
      <NotFoundMessage title="Tabs not found" />;
  }
};

export default TabPage;
