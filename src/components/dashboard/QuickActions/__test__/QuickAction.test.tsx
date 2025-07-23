import { useRouter } from 'next/navigation';
import QuickActions from '..';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
});

describe('QuickAction component', () => {
  test('Renders all action', () => {
    render(<QuickActions />);

    expect(screen.getByText('Leave Applications')).toBeInTheDocument();
    expect(screen.getByText('Update Profile')).toBeInTheDocument();
  });

  test('Navigate correctly when clicking an action button', () => {
    render(<QuickActions />);

    fireEvent.click(screen.getByText('Leave Applications'));

    expect(mockPush).toHaveBeenCalledWith('/dashboard/leave-applications');
  });
});
