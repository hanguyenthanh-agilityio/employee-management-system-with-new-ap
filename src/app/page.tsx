'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

// Constants
import { ROUTER } from '@/constants';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTER.LOGIN);
  }, [router]);

  return null;
}
