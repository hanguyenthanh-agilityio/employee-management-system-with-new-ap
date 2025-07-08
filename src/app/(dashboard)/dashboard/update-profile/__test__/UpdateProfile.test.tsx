import { render } from '@testing-library/react';
import { redirect } from 'next/navigation';

// Pages
import UpdateProfilePage from '../page';

// Constants
import { ROUTER } from '@/constants';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('UpdateProfilePage', () => {
  it('redirects to personal-details page', () => {
    render(<UpdateProfilePage />);
    expect(redirect).toHaveBeenCalledWith(ROUTER.PROFILE_EDIT);
  });
});
