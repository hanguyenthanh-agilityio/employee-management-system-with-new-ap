import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// Components
import { LeaveApplicationSection } from '@/components';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
});

describe('LeaveApplicationSection', () => {
  test('Renders all leave cards', () => {
    render(<LeaveApplicationSection />);

    expect(screen.getByText('Annual Leave')).toBeInTheDocument();
    expect(screen.getByText('Sick Leave')).toBeInTheDocument();
    expect(screen.getByText('Maternity Leave')).toBeInTheDocument();
    expect(screen.getByText('Exam Leave')).toBeInTheDocument();
  });

  test('Navigates to create page on card click', () => {
    render(<LeaveApplicationSection />);

    fireEvent.click(screen.getByText('Sick Leave'));
    expect(mockPush).toHaveBeenCalledWith(
      '/dashboard/leave-applications/create?type=Sick%20Leave',
    );
  });
});
