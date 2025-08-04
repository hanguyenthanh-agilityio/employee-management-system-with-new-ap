// Components
import { NotFoundFallback } from '@/components';

// Constants
import { ROUTER } from '@/constants';

const NotFound = () => <NotFoundFallback backHref={ROUTER.LEAVE_APPLICATION} />;

export default NotFound;
