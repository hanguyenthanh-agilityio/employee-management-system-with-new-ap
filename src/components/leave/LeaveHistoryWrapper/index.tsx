// Components
import { LeaveHistorySection } from '@/components';

// Services
import { getLeaveApplications } from '@/services/leave/leaveService';
import { getCurrentUser } from '@/services/user/userService';

const LeaveHistoryWrapper = async () => {
  const userId = await getCurrentUser();
  const data = await getLeaveApplications(userId.id);

  return <LeaveHistorySection data={data.data} />;
};

export default LeaveHistoryWrapper;
