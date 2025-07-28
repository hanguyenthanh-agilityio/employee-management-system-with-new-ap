import { render, screen } from '@testing-library/react';
import DashboardPage from '../page';
import { ReactNode } from 'react';

// Mock components
jest.mock('@/components', () => ({
  Header: ({ title }: { title: string }) => (
    <div data-testid="header">{title}</div>
  ),
  ProfileSection: ({ name, jobTitle }: { name: string; jobTitle: string }) => (
    <div data-testid="profile">
      {name} - {jobTitle}
    </div>
  ),
  QuickActions: () => <div data-testid="quick-actions">Quick Actions</div>,
  LeaveSection: ({
    data,
  }: {
    data: { length: ReactNode; type: string; total: number };
  }) => <div data-testid="leave-section">Leave Count: {data.length}</div>,
  BirthdaySection: () => (
    <div data-testid="birthday-section">BirthdaySection</div>
  ),
  PaySlipSection: () => <div data-testid="payslip-section">PaySlipSection</div>,
}));

// Mock APIs
jest.mock('@/services', () => ({
  getCachedUser: jest.fn(() =>
    Promise.resolve({ username: 'John Doe', jobTitle: 'Developer' }),
  ),
}));

jest.mock('@/api/leaveApplications', () => ({
  fetchSummaryLeaves: jest.fn(() =>
    Promise.resolve({ data: [{ type: 'Annual', total: 10 }] }),
  ),
}));

describe('DashboardPage', () => {
  it('renders all sections with correct data', async () => {
    render(await DashboardPage());

    // Profile
    expect(screen.getByTestId('profile')).toHaveTextContent(
      'John Doe - Developer',
    );

    // Quick Actions
    expect(screen.getByTestId('quick-actions')).toBeInTheDocument();

    // Leave Section
    expect(screen.getByTestId('leave-section')).toHaveTextContent(
      'Leave Count: 1',
    );

    // Birthday
    expect(screen.getByTestId('birthday-section')).toBeInTheDocument();

    // Payslip
    expect(screen.getByTestId('payslip-section')).toBeInTheDocument();
  });
});
