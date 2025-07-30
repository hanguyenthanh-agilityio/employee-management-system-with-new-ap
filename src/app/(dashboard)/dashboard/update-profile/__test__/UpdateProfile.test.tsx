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
  test('redirects to personal-details page', () => {
    render(<UpdateProfilePage />);
    expect(redirect).toHaveBeenCalledWith(ROUTER.EDIT_PERSONAL_DETAILS);
  });
});
