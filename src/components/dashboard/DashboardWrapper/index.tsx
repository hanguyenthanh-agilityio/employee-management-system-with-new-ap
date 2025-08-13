// Components
import {
  BirthdaySection,
  Header,
  LeaveSection,
  PaySlipSection,
  ProfileSection,
  QuickActions,
} from '@/components';

// Services
import { getCurrentUser } from '@/services/user/userService';

// APIs
import { fetchSummaryLeaves } from '@/api/leaveApplications';

const DashboardWrapper = async () => {
  const user = await getCurrentUser();
  const summaryData = await fetchSummaryLeaves();

  // Show user detail
  const { username, jobTitle } = user;

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-12 lg:px-8">
      <h1 className="sr-only">Dashboard page</h1>
      <Header title="Dashboard" />

      {/* Profile Section */}
      <ProfileSection name={username} jobTitle={jobTitle} />

      {/* Quickly Action */}
      <div>
        <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl">Quick Actions</h2>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaveSection data={summaryData.data} />
        <BirthdaySection />
        <PaySlipSection />
      </div>
    </div>
  );
};

export default DashboardWrapper;
