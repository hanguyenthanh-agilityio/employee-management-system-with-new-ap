import { render, screen } from '@testing-library/react';

// Constants
import { BREADCRUMBS } from '@/constants';

// Components
import { Breadcrumbs } from '@/components';

describe('Breadcrumbs component', () => {
  test('renders all breadcrumb paths', () => {
    render(<Breadcrumbs paths={BREADCRUMBS.LEAVE_APPLICATION} />);
    BREADCRUMBS.LEAVE_APPLICATION.forEach((path) => {
      expect(screen.getByText(path)).toBeInTheDocument();
    });
  });
});
