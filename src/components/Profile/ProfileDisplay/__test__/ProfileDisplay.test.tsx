import { render, screen } from '@testing-library/react';

// Components
import { ProfileDisplay } from '@/components';

// Constants
import { AVATAR_URL } from '@/constants';

describe('ProfileDisplay component', () => {
  const props = {
    avatarName: 'Jane Doe',
    avatarUrl: AVATAR_URL,
  };

  test('renders Avatar with fallback text', () => {
    render(<ProfileDisplay {...props} />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  test('renders ProfileEditForm inside a form element', () => {
    const { container } = render(<ProfileDisplay {...props} />);
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });
});
