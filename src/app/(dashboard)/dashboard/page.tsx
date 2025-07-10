// Components

import {
  BirthdaySection,
  Header,
  LeaveSection,
  PaySlipSection,
  ProfileSection,
  QuickActions,
} from '@/components';
import { TYPE_LABELS } from '@/constants';
import { getCurrentUser, getSummaryLeaves } from '@/services/apiService';

const DashboardPage = async () => {
  const userId = await getCurrentUser();
  const summaryData = await getSummaryLeaves(userId.id);
  const summaryDataArray = Object.entries(summaryData).map(([type, total]) => ({
    type: TYPE_LABELS[type] || type,
    total: Number(total),
  }));

  console.log('Summary Leave: ', summaryData);

  return (
    <section className="flex flex-col gap-12">
      <Header title="Dashboard" />

      {/* Profile Section */}
      <ProfileSection
        name="Redwan husein"
        jobTitle="UI / UX Designer & UX Writer"
      />

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
