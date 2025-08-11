import { render, screen } from '@testing-library/react';
import DashboardSkeleton from '..';

// Mock Skeleton để dễ kiểm tra
jest.mock('@/components', () => ({
  Skeleton: ({ customClass }: { customClass: string }) => (
    <div data-testid="skeleton" data-class={customClass} />
  ),
}));

describe('DashboardSkeleton', () => {
  test('renders the main container with animate-pulse class', () => {
    const { container } = render(<DashboardSkeleton />);
    const rootDiv = container.querySelector('div');
    expect(rootDiv).toHaveClass('animate-pulse');
  });

  test('renders header skeleton', () => {
    render(<DashboardSkeleton />);
    const skeletons = screen.getAllByTestId('skeleton');
    const headerSkeleton = skeletons.find((el) =>
      el.getAttribute('data-class')?.includes('h-6 w-48'),
    );
    expect(headerSkeleton).toBeInTheDocument();
  });

  test('renders profile card div', () => {
    const { container } = render(<DashboardSkeleton />);
    const profileCard = container.querySelector('.h-32');
    expect(profileCard).toBeInTheDocument();
  });

  test('renders correct number of skeletons for Payslip section', () => {
    render(<DashboardSkeleton />);

    const payslipSkeletons = screen
      .getAllByTestId('skeleton')
      .filter((el) => el.getAttribute('data-class')?.includes('h-4 w-full'));
    expect(payslipSkeletons.length).toBeGreaterThanOrEqual(12);
  });
});
