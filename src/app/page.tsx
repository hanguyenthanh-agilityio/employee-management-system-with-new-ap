import { redirect } from 'next/navigation';

// Constants
import { ROUTER } from '@/constants';

export default function Home() {
  redirect(ROUTER.LOGIN);
}
