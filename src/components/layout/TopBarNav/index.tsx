'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Constants
import { LIST_ITEM } from '@/constants';

const TopBarNav = () => {
  const pathname = usePathname();

  return (
    <>
      {LIST_ITEM.map((item) => {
        const isActive =
          item.href === '/dashboard'
            ? pathname.startsWith('/dashboard')
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              'text-xl font-medium transition-colors duration-200',
              isActive
                ? 'text-primary border-b-2 border-yellow-400 pb-3'
                : 'text-gray-600 hover:text-primary',
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </>
  );
};

export default TopBarNav;
