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
jest.mock('@/actions/leaveApplications', () => ({
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

  test('Sets previewUrl when an image file is selected', () => {
    render(<CreateLeaveContent />);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.URL.createObjectURL as any) = jest.fn(
      () => 'blob:http://localhost/test-image',
    );

    const imageFile = new File(['image content'], 'test-image.png', {
      type: 'image/png',
    });

    const fileInput = screen.getByLabelText(/document/i) as HTMLInputElement;

    fireEvent.change(fileInput, {
      target: { files: [imageFile] },
    });

    expect(fileInput.files?.[0]).toBe(imageFile);
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(imageFile);

    expect(screen.getByAltText(/document preview/i)).toBeInTheDocument();
  });
});
