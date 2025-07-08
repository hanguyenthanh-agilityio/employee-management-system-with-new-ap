import { redirect } from 'next/navigation';

// Constants
import { ROUTER } from '@/constants';

const UpdateProfilePage = () => {
  redirect(ROUTER.PROFILE_EDIT);
};

export default UpdateProfilePage;
