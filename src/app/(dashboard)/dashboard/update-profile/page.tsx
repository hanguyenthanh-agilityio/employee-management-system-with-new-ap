import { redirect } from 'next/navigation';

// Constants
import { ROUTER } from '@/constants';

export default function UpdateProfilePage() {
  redirect(ROUTER.EDIT_PERSONAL_DETAILS);
}
