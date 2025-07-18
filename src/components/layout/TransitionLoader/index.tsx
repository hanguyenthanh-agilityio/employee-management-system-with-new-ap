// Icons
import { Loading } from '@/icons';

const TransitionLoader = () => {
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
