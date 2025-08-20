import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getCurrentUser } from '@/services/user/userService';
import { fetchSummaryLeaves } from '@/actions/leaveApplications';
import DashboardWrapper from '..';

jest.mock('@/components', () => ({
  Header: ({ title }: { title: string }) => <div>{title}</div>,
  ProfileSection: ({ name, jobTitle }: { name: string; jobTitle: string }) => (
    <div>
      Profile: {name} - {jobTitle}
    </div>
  ),
  QuickActions: () => <div>Quick Actions</div>,
  LeaveSection: ({ data }: { data: unknown }) => (
    <div>Leave Section: {JSON.stringify(data)}</div>
  ),
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

  test.skip('renders dashboard with user and summary data', async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue({
      username: 'John Doe',
      jobTitle: 'Software Engineer',
    });

    (fetchSummaryLeaves as jest.Mock).mockResolvedValue({
      data: { annual: 5, sick: 2 },
    });

    render(await DashboardWrapper());

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(
      screen.getByText('Profile: John Doe - Software Engineer'),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Quick Actions')).toHaveLength(2);
    expect(screen.getByText(/Leave Section/)).toBeInTheDocument();
    expect(screen.getByText('Birthday Section')).toBeInTheDocument();
    expect(screen.getByText('Pay Slip Section')).toBeInTheDocument();

    expect(getCurrentUser).toHaveBeenCalled();
    expect(fetchSummaryLeaves).toHaveBeenCalled();
  });
});
