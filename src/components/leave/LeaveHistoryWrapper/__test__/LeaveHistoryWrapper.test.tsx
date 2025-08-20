import { render, screen, act } from '@testing-library/react';

// Mock LeaveHistorySection to control its rendering
jest.mock('@/components', () => ({
  LeaveHistorySection: ({ data }: { data: LeaveItem[] }) => (
    <div data-testid="leave-history-section">{data.length} records</div>
  ),
}));

// Mock service functions
jest.mock('@/services/user/userService', () => ({
  getCurrentUser: jest.fn(),
}));

jest.mock('@/services/leave/leaveService', () => ({
  getLeaveApplications: jest.fn(),
}));

// Components
import LeaveHistoryWrapper from '..';

// Types
import { LeaveItem } from '@/types/components';

// Services
import { getCurrentUser } from '@/services/user/userService';
import { getLeaveApplications } from '@/services/leave/leaveService';

describe('LeaveHistoryWrapper', () => {
  test('Renders LeaveHistorySection with fetched data', async () => {
    // Arrange mock data
    (getCurrentUser as jest.Mock).mockResolvedValue({ id: 'user-123' });
    (getLeaveApplications as jest.Mock).mockResolvedValue({
      data: [{ id: 'leave-1' }, { id: 'leave-2' }],
    });

    let wrapper: React.ReactElement;

    // Act: await the async server component and render
    await act(async () => {
      wrapper = await LeaveHistoryWrapper();
    });

    render(wrapper!);

    // Assert: check that the mocked component rendered correctly
    const section = await screen.findByTestId('leave-history-section');
    expect(section).toHaveTextContent('2 records');
  });
});
