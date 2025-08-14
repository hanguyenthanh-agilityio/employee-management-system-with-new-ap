import { render, screen } from '@testing-library/react';

// Mock component con
jest.mock('@/components', () => ({
  CreateLeaveContent: jest.fn(() => <div data-testid="create-leave-content" />),
}));

// Import page sau khi mock
import CreateLeavePage, {
  metadata,
} from '@/app/(dashboard)/dashboard/leave-applications/create/page';

describe('CreateLeavePage', () => {
  test('Renders CreateLeaveContent', () => {
    render(<CreateLeavePage />);

    expect(screen.getByTestId('create-leave-content')).toBeInTheDocument();
  });

  test('Has correct metadata', () => {
    expect(metadata.title).toBe('Create Leave');
  });
});
