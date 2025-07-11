// Components
import { LeaveHistorySection } from '@/components';

// Services
import { getCachedUser, getLeaveApplications } from '@/services/apiService';

const LeaveHistoryWrapper = async () => {
  const userId = await getCachedUser();
  const data = await getLeaveApplications(userId.id);

  return <LeaveHistorySection data={data.data} />;
};

export default LeaveHistoryWrapper;
