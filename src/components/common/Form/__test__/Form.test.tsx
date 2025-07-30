import { CreateLeaveContent } from '@/components';
import { LeaveItem } from '@/types/components';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: () => 'Annual Leave',
  }),
}));

const createLeaveApplicationMock = jest.fn();
jest.mock('@/api/leaveApplications', () => ({
  createLeaveApplication: (...args: LeaveItem[]) =>
    createLeaveApplicationMock(...args),
}));
describe('CreateLeaveContent', () => {
  test('Renders the leave form', () => {
    render(<CreateLeaveContent />);
    expect(screen.getByTestId('leave-form')).toBeInTheDocument();
  });

  test('Calls onChange when a file is selected', () => {
    render(<CreateLeaveContent />);

    const file = new File(['dummy content'], 'test-document.pdf', {
      type: 'application/pdf',
    });

    const fileInput = screen.getByLabelText(/document/i) as HTMLInputElement;

    // Fire change event with the file
    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    // Assert: file should be in the input
    expect(fileInput.files?.[0]).toBe(file);
    expect(fileInput.files?.[0].name).toBe('test-document.pdf');
    expect(fileInput.files).toHaveLength(1);
  });
});
