// Components
import { LeaveHistorySection } from '@/components';

// Services
import { getCurrentUser, getLeaveApplications } from '@/services/apiService';

const LeaveHistoryWrapper = async () => {
  const userId = await getCurrentUser();
  const data = await getLeaveApplications(userId.id);

  return <LeaveHistorySection data={data.data} />;
};

export default LeaveHistoryWrapper;
