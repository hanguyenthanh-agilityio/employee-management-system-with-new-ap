import { twMerge } from 'tailwind-merge';

// Types
import { CustomClassType } from '@/types/components';

const Skeleton = ({ customClass = 'h-2.5 w-48 mb-3' }: CustomClassType) => (
  <div className="animate-pulse">
    <div
      data-testid="skeleton-block"
      className={twMerge(
        'bg-gray-200 rounded-lg dark:bg-gray-700',
        customClass,
      )}
    />
  </div>
);

export default Skeleton;
