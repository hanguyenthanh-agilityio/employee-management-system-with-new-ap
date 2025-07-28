import { render, screen, waitFor } from '@testing-library/react';
import CreateLeavePage from '../page';

jest.mock('@/components', () => ({
  Breadcrumbs: () => <div data-testid="breadcrumbs" />,
  LoadingFormLeave: () => <div data-testid="loading-form">Loading...</div>,
}));

jest.mock('@/components/leave/CreateForm', () => ({
  __esModule: true,
  default: () => <div data-testid="create-leave-form">Create Leave Form</div>,
}));

describe('CreateLeavePage', () => {
  it('renders breadcrumbs, title, description, and form', async () => {
    render(<CreateLeavePage />);

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();

    expect(screen.getByText('Leave Application')).toBeInTheDocument();

    expect(
      screen.getByText(/Fill the required fields below to apply for leave/i),
    ).toBeInTheDocument();

    // While waiting for lazy component
    expect(screen.getByTestId('loading-form')).toBeInTheDocument();

    // Wait for lazy component to appear
    await waitFor(() => {
      expect(screen.getByTestId('create-leave-form')).toBeInTheDocument();
    });
  });
});
