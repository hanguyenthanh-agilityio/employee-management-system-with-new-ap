import { Suspense } from 'react';

// Components
import {
  LoadingFormLeave,
  NotFoundMessage,
  ProfileDisplay,
  ContactDetailsSection,
} from '@/components';

// Constants
import { TAB_ITEM } from '@/constants';

// Services
import { getCurrentUser } from '@/services/user/userService';

interface Props {
  params: { tab: string };
}

export async function generateMetadata({ params }: Props) {
  const { tab } = params;

  switch (tab) {
    case TAB_ITEM.PERSONAL_DETAILS:
      return {
        title: 'Profile - Personal Details',
        describe: 'View and edit personal details',
      };
    case TAB_ITEM.CONTACT_DETAILS:
      return {
        title: 'Profile - Contact Details',
        describe: 'View and edit contact details',
      };
    default:
      return {
        title: 'Profile - Not found',
        describe: 'The tab was not found',
      };
  }
}

const PersonalDetailsContent = async () => {
  const userData = await getCurrentUser();

  return <ProfileDisplay profile={userData} />;
};

const ContactDetailsContent = async () => {
  const userData = await getCurrentUser();

  return <ContactDetailsSection contact={userData} />;
};

export default async function TabPage({ params }: Props) {
  const { tab } = params;

  switch (tab) {
    case TAB_ITEM.PERSONAL_DETAILS:
      return (
        <Suspense fallback={<LoadingFormLeave />}>
          <PersonalDetailsContent />
        </Suspense>
      );

    case TAB_ITEM.CONTACT_DETAILS:
      return (
        <Suspense fallback={<LoadingFormLeave />}>
          <ContactDetailsContent />
        </Suspense>
      );

    default:
      return <NotFoundMessage title="Tabs not found" />;
  }
}
