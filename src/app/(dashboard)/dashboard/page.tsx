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
import { getCurrentUser } from '@/services/apiService';

// APIs
import { fetchSummaryLeaves } from '@/api/leaveApplications';

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const summaryData = await fetchSummaryLeaves();

  // Show user detail
  const { username, jobTitle } = user;

  return (
    <section className="flex flex-col gap-12">
      <Header title="Dashboard" />

      {/* Profile Section */}
      <ProfileSection name={username} jobTitle={jobTitle} />

      {/* Quickly Action */}
      <div>
        <h2 className="mb-6 text-3xl">Quick Actions</h2>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaveSection data={summaryData.data} />
        <BirthdaySection />
        <PaySlipSection />
      </div>
    </section>
  );
};

export default DashboardPage;
