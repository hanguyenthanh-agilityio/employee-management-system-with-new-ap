'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Constants
import { TABS_SIDEBAR } from '@/constants';

const ProfileSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full lg:w-[400px] flex flex-col gap-4 md:gap-6 p-4 bg-white dark:bg-darkSecondary rounded-lg shadow-sm">
      {TABS_SIDEBAR.map(({ label, tab }) => (
        <Link
          key={tab}
          href={`/dashboard/update-profile/${tab}`}
          className={`text-center px-10 py-4 md:py-6 rounded-lg text-lg md:text-xl ${
            pathname.endsWith(tab)
              ? 'bg-yellow text-black font-bold'
              : 'bg-lightBlue text-dark dark:bg-[#1F2937] dark:text-white hover:bg-blue-200 dark:hover:bg-[#374151]'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default ProfileSidebar;
