'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Constants
import { LIST_ITEM } from '@/constants';

interface TopBarNavProps {
  onClickItem?: () => void;
}

const TopBarNav = ({ onClickItem }: TopBarNavProps) => {
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
              'relative px-1 text-lg font-medium transition-all duration-200',
              isActive
                ? 'text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-yellow-400'
                : 'text-gray-600 hover:text-primary',
            )}
            onClick={onClickItem}
          >
            {item.name}
          </Link>
        );
      })}
    </>
  );
};

export default TopBarNav;
