/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditForm from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), refresh: jest.fn() })),
}));

jest.mock('@/actions/leaveApplications', () => ({
  updateLeaveApplication: jest.fn(),
}));

jest.mock('@/utils/upload', () => ({
  uploadFileToStrapi: jest.fn(),
}));

jest.mock('@/components', () => ({
  __esModule: true,
  Form: ({ form, fields, onReset, isLoading }: any) => (
    <div>
      {fields.map((f: any) => (
        <input
          key={f.name}
          {...form.register(f.name)}
          defaultValue={form.getValues(f.name)}
        />
      ))}
      <button type="submit">Submit</button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      {isLoading && <span data-testid="loader">Loading...</span>}
    </div>
  ),
}));

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const leaveMock = {
  documentId: '1',
  startDate: '2025-08-01',
  endDate: '2025-08-03',
  employeeName: 'Ha Nguyen',
  type: 'annual',
  reason: 'Resting',
  durations: 3,
  resumptionDate: '2025-08-04',
  status: '',
  document: { id: 1, name: '', url: '' },
};

describe('EditForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields with default values', () => {
    render(<EditForm leave={leaveMock} />);

    expect(screen.getByDisplayValue('2025-08-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2025-08-03')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2025-08-04')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Resting')).toBeInTheDocument();
  });

  test('resets form when reset button is clicked', async () => {
    render(<EditForm leave={leaveMock} />);
    fireEvent.change(screen.getByDisplayValue('Resting'), {
      target: { value: 'Changed' },
    });
    fireEvent.click(screen.getByText(/reset/i));

    await waitFor(() => {
      expect(screen.getByDisplayValue('Resting')).toBeInTheDocument();
    });
  });
});
