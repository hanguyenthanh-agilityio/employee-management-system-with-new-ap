// Components
import {
  BirthdaySection,
  Header,
  LeaveSection,
  PaySlipSection,
  ProfileSection,
  QuickActions,
} from '@/components';

// Constants
import { TYPE_LABELS } from '@/constants';

// Services
import { getCurrentUser, getSummaryLeaves } from '@/services/apiService';

const DashboardPage = async () => {
  const userId = await getCurrentUser();
  const summaryData = await getSummaryLeaves(userId.id);

  // Convert object to array
  const summaryDataArray = Object.entries(summaryData).map(([type, total]) => ({
    type: TYPE_LABELS[type] || type,
    total: Number(total),
  }));

  // Show user detail
  const { username, jobTitle } = userId;

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
        <LeaveSection data={summaryDataArray} />
        <BirthdaySection />
        <PaySlipSection />
      </div>
    </section>
  );
};

export default DashboardPage;
