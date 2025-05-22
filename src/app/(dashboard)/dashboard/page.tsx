// Components

import {
  BirthdaySection,
  Header,
  LeaveSection,
  PaySlipSection,
  ProfileSection,
  QuickActions,
} from '@/components';

const DashboardPage = () => (
  <section className="flex flex-col gap-12">
    <Header title="Dashboard" />

    {/* Profile Section */}
    <ProfileSection
      name="Redwan husein"
      jobTitle="UI / UX Designer & UX Writer"
    />

    {/* Quickly Action */}
    <QuickActions />

    <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
      <LeaveSection />
      <BirthdaySection />
      <PaySlipSection />
    </div>
  </section>
);

export default DashboardPage;
