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
import { getCachedUser } from '@/services';

// APIs
import { fetchSummaryLeaves } from '@/api/leaveApplications';

const DashboardPage = async () => {
  const user = await getCachedUser();
  const summaryData = await fetchSummaryLeaves();

  // Show user detail
  const { username, jobTitle } = user;

  return (
    <main className="flex flex-col gap-10 md:gap-12 px-4 md:px-8">
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
    </main>
  );
};

export default DashboardPage;
