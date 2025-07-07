import { render, screen } from '@testing-library/react';

// Components
import { InfoBlock } from '@/components';

describe('InfoBlock component', () => {
  test('renders label and value', () => {
    render(<InfoBlock label="Employee Name" value="Biruk Dawit" />);
    expect(screen.getByText('Employee Name')).toBeInTheDocument();
    expect(screen.getByText('Biruk Dawit')).toBeInTheDocument();
  });
});
