import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { ProfileDisplay } from '@/components';

describe('ProfileDisplay component', () => {
  const props = {
    name: 'Biruk Dawit',
    avatarName: 'Biruk Dawit',
    avatarUrl: '',
    department: 'Design & Marketing',
    jobTitle: 'UI / UX Designer',
    jobCategory: 'Full-time',
    onEdit: jest.fn(),
  };

  test('renders all info blocks and avatar fallback', () => {
    render(<ProfileDisplay {...props} />);
    expect(screen.getByText('Biruk Dawit')).toBeInTheDocument();
    expect(screen.getByText('Design & Marketing')).toBeInTheDocument();
    expect(screen.getByText('UI / UX Designer')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(<ProfileDisplay {...props} />);
    fireEvent.click(screen.getByText(/edit/i));
    expect(props.onEdit).toHaveBeenCalled();
  });
});
