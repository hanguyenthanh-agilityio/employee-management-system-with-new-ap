import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardWrapper from '..';
import { getCurrentUser } from '@/services/user/userService';
import { fetchSummaryLeaves } from '@/actions/leaveApplications';

// Mock all components used in DashboardWrapper
jest.mock('@/components', () => ({
  Heading: ({ title }: { title: string }) => <div>{title}</div>,
  ProfileSection: ({ name, jobTitle }: { name: string; jobTitle: string }) => (
    <div>
      Profile: {name} - {jobTitle}
    </div>
  ),
  QuickActions: () => <div>Quick Actions</div>,
  LeaveSection: ({ data }: { data: unknown }) => (
    <div>Leave Section: {JSON.stringify(data)}</div>
  ),
  LeaveSectionSkeleton: () => <div>LeaveSectionSkeleton</div>,
  BirthdaySection: () => <div>Birthday Section</div>,
  PaySlipSection: () => <div>Pay Slip Section</div>,
}));

// Mock services
jest.mock('@/services/user/userService', () => ({
  getCurrentUser: jest.fn(),
}));

jest.mock('@/actions/leaveApplications', () => ({
  fetchSummaryLeaves: jest.fn(),
}));

describe('DashboardWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders dashboard with user and summary data', async () => {
    // Mock user service
    (getCurrentUser as jest.Mock).mockResolvedValue({
      username: 'John Doe',
      jobTitle: 'Software Engineer',
    });

    // Mock leave summary service
    (fetchSummaryLeaves as jest.Mock).mockResolvedValue({
      data: { annual: 5, sick: 2 },
    });

    // Render async Server Component
    await act(async () => {
      render(await DashboardWrapper());
    });

    // Assert main sections
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(
      screen.getByText('Profile: John Doe - Software Engineer'),
    ).toBeInTheDocument();

    // QuickActions appears twice: in "Quick Actions" header and component
    expect(screen.getAllByText('Quick Actions')).toHaveLength(2);

    // LeaveSection with mocked data
    expect(
      screen.getByText(/Leave Section: .*annual.*sick/),
    ).toBeInTheDocument();

    // Other sections
    expect(screen.getByText('Birthday Section')).toBeInTheDocument();
    expect(screen.getByText('Pay Slip Section')).toBeInTheDocument();

    // Services called
    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(fetchSummaryLeaves).toHaveBeenCalledTimes(3);
  });
});
