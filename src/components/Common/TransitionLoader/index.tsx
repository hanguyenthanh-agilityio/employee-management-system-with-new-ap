// components/shared/PageTransitionLoader.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Icons
import { Loading } from '@/icons';

const TransitionLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-30 flex items-center justify-center">
      <div role="status">
        <Loading width={10} height={10} />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default TransitionLoader;
