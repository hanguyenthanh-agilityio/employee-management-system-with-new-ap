/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import LeaveSection from '..';

// Mock các component con nếu cần thiết
jest.mock('@/components', () => ({
  Card: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
  NotFoundMessage: ({ title, className }: any) => (
    <div className={className}>{title}</div>
  ),
  ProgressBar: ({ type, total }: any) => (
    <div data-testid="progress-bar">
      {type} - {total}
    </div>
  ),
}));

describe('LeaveSection', () => {
  test('renders title and icon correctly', () => {
    render(<LeaveSection data={[]} />);

    expect(screen.getByText(/Available Leave Days/i)).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  test('renders NotFoundMessage when data is empty', () => {
    render(<LeaveSection data={[]} />);

    expect(screen.getByText(/No leave data available/i)).toBeInTheDocument();
  });

  test('renders ProgressBar components when data is provided', () => {
    const data = [
      { type: 'Annual Leave', total: 10 },
      { type: 'Sick Leave', total: 5 },
    ];
    render(<LeaveSection data={data} />);

    const progressBars = screen.getAllByTestId('progress-bar');
    expect(progressBars).toHaveLength(data.length);
    expect(
      screen.queryByText(/No leave data available/i),
    ).not.toBeInTheDocument();
  });
});
