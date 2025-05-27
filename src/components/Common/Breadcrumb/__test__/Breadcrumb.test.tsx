import { render, screen } from '@testing-library/react';
import Breadcrumbs from '..';

describe('Breadcrumbs component', () => {
  test('renders all breadcrumb paths', () => {
    const paths = ['Home', 'Products', 'Shoes'];
    render(<Breadcrumbs paths={paths} />);
    paths.forEach((path) => {
      expect(screen.getByText(path)).toBeInTheDocument();
    });
  });
});
