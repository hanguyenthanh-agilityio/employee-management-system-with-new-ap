import { render, screen } from '@testing-library/react';
import CreateLeaveContent from '..';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/components', () => ({
  Breadcrumbs: ({ paths }: { paths: string[] }) => (
    <div data-testid="breadcrumbs">{JSON.stringify(paths)}</div>
  ),
  LoadingFormLeave: () => <div data-testid="loading-form">Loading...</div>,
}));

jest.mock('@/components/leave/CreateForm', () => ({
  __esModule: true,
  default: () => <div data-testid="create-leave-form">Create Leave Form</div>,
}));

jest.mock('@/constants', () => ({
  BREADCRUMBS: {
    CREATE_LEAVE: (type: string) => [`Home`, `Leave`, `Create ${type}`],
  },
}));

describe('CreateLeavePage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default type when no type is passed', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    render(<CreateLeaveContent />);

    expect(screen.getByTestId('breadcrumbs')).toHaveTextContent(
      JSON.stringify(['Home', 'Leave', 'Create Leave']),
    );
  });

  test('renders with custom type when type is passed', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => 'Sick',
    });

    render(<CreateLeaveContent />);

    expect(screen.getByTestId('breadcrumbs')).toHaveTextContent(
      JSON.stringify(['Home', 'Leave', 'Create Sick']),
    );
  });
});
