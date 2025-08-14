/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import ApplyForLeavePage from '../page';

// Mock components
jest.mock('@/components', () => ({
  Breadcrumbs: ({ paths }: any) => (
    <div data-testid="breadcrumbs">{paths?.[0]?.label}</div>
  ),
  LeaveApplicationSection: () => (
    <div data-testid="leave-application-section">Leave Form</div>
  ),
  LeaveHistoryWrapper: () => (
    <div data-testid="leave-history-wrapper">Leave History Table</div>
  ),
  LoadingLeaveApplication: () => (
    <div data-testid="loading-leave-application">Loading...</div>
  ),
}));

describe('ApplyForLeavePage', () => {
  test('Renders Breadcrumbs and main sections', async () => {
    render(await ApplyForLeavePage());

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('leave-application-section')).toBeInTheDocument();
    expect(screen.getByTestId('leave-history-wrapper')).toBeInTheDocument();
  });
});
