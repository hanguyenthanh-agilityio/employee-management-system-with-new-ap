import { render, screen, fireEvent } from '@testing-library/react';

import { useRouter } from 'next/navigation';
import ProfileSection from '..';
import { ROUTER } from '@/constants';

// Mock router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProfileSection component', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  test('Renders name and job title', () => {
    render(<ProfileSection name="John Doe" jobTitle="Frontend Developer" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  test('Navigates when clicking the Edit Profile button', () => {
    render(<ProfileSection name="Jane Smith" jobTitle="Designer" />);

    const button = screen.getByRole('button', { name: /edit profile/i });

    fireEvent.click(button);

    expect(push).toHaveBeenCalledWith(ROUTER.EDIT_PERSONAL_DETAILS);
  });
});
