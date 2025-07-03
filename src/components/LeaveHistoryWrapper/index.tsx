// APIs
import {
  fetchLeaveApplications,
  getAuthenticatedUserId,
} from '@/api/leaveApplications';

// Components

import { LeaveHistorySection } from '@/components';
const LeaveHistoryWrapper = async () => {
  const userId = await getAuthenticatedUserId();
  const data = await fetchLeaveApplications(userId);

  return <LeaveHistorySection data={data.data} />;
};

export default LeaveHistoryWrapper;
