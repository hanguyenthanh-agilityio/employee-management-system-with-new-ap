// Icons
import { Loading } from '@/icons';

const TransitionLoader = () => (
  <div className="fixed inset-0 z-[9999] bg-black bg-opacity-30 dark:bg-opacity-50 flex items-center justify-center cursor-not-allowed-auto">
    <div role="status">
      <Loading width={10} height={10} />
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default TransitionLoader;
