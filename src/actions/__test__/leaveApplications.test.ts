// Services
import {
  deleteLeave,
  getSummaryLeaves,
  patchLeaveApplication,
  postLeaveApplication,
} from '@/services/leave/leaveService';
import { getCurrentUser } from '@/services/user/userService';

// Apis
import {
  createLeaveApplication,
  deleteLeaveApplication,
  fetchSummaryLeaves,
  updateLeaveApplication,
} from '../leaveApplications';

// Constants
import { ERROR_MESSAGE } from '@/constants';
import { ServerError } from '@/utils/error';
import { LeaveApplicationInput } from '@/utils/schemas/leaveApplicationSchema';

jest.mock('@/services/leave/leaveService');
jest.mock('@/services/user/userService');

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

const mockedPost = postLeaveApplication as jest.Mock;
const mockedPatch = patchLeaveApplication as jest.Mock;
const mockedDelete = deleteLeave as jest.Mock;
const mockedGetSummary = getSummaryLeaves as jest.Mock;
const mockedGetUser = getCurrentUser as jest.Mock;

describe('leaveActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const formData: LeaveApplicationInput = {
    type: 'Annual Leave',
    startDate: '2025-09-27',
    endDate: '2025-09-29',
    durations: 3,
    resumptionDate: '2025-09-30',
    reason: 'Vacation',
  };

  describe('createLeaveApplication', () => {
    test('Should create leave application successfully', async () => {
      mockedGetUser.mockResolvedValue({ id: 1, username: 'john' });
      mockedPost.mockResolvedValue({});

      const result = await createLeaveApplication(formData);

      expect(mockedPost).toHaveBeenCalledWith({
        data: expect.objectContaining({
          ...formData,
          users_permissions_user: 1,
          employeeName: 'john',
        }),
      });
      expect(result).toEqual({ success: true });
    });

    test('Should return error if user is missing', async () => {
      mockedGetUser.mockResolvedValue(null);

      const result = await createLeaveApplication(formData);

      expect(result.success).toBe(false);
      expect(result.isUserError).toBe(true);
      expect(result.status).toBe(401);
      expect(result.message).toBe('You must login to continue.');
    });

    test('Should return server error if post fails', async () => {
      mockedGetUser.mockResolvedValue({ id: 1, username: 'john' });
      mockedPost.mockRejectedValue(new Error('Failed to post'));

      const result = await createLeaveApplication(formData);

      expect(result.success).toBe(false);
      expect(result.isUserError).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe(
        'Unexpected error occurred while creating leave.',
      );
    });
  });

  describe('updateLeaveApplication', () => {
    test('Should update leave application successfully', async () => {
      mockedPatch.mockResolvedValue({});

      const result = await updateLeaveApplication('123', formData);

      expect(mockedPatch).toHaveBeenCalledWith(
        '123',
        expect.objectContaining(formData),
      );
      expect(result).toEqual({ success: true });
    });

    test('Should throw ServerError if patch fails', async () => {
      mockedPatch.mockRejectedValue(new Error('DB down'));

      await expect(updateLeaveApplication('123', formData)).rejects.toThrow(
        new ServerError(ERROR_MESSAGE.UPDATE_LEAVE_FAILED, 500),
      );
    });
  });

  describe('deleteLeaveApplication', () => {
    test('Should delete application successfully', async () => {
      mockedDelete.mockResolvedValue({});

      const result = await deleteLeaveApplication('456');

      expect(mockedDelete).toHaveBeenCalledWith('456');
      expect(result).toEqual({ success: true });
    });

    test('Should return error if delete fails', async () => {
      mockedDelete.mockRejectedValue(new Error('DB error'));

      const result = await deleteLeaveApplication('456');

      expect(result).toEqual({
        success: false,
        message: ERROR_MESSAGE.DELETE_LEAVE_FAILED,
      });
    });
  });

  describe('fetchSummaryLeaves', () => {
    test('Should return summary leaves successfully', async () => {
      mockedGetUser.mockResolvedValue({ id: 1 });
      mockedGetSummary.mockResolvedValue({ total: 10 });

      const result = await fetchSummaryLeaves();

      expect(mockedGetSummary).toHaveBeenCalledWith(1);
      expect(result).toEqual({ success: true, data: { total: 10 } });
    });

    test('Should return error if user missing', async () => {
      mockedGetUser.mockResolvedValue(null);

      const result = await fetchSummaryLeaves();

      expect(result).toEqual({
        success: false,
        message: ERROR_MESSAGE.SUMMARY_LEAVE_FAILED,
      });
    });

    test('Should return error if fetching summary fails', async () => {
      mockedGetUser.mockResolvedValue({ id: 1 });
      mockedGetSummary.mockRejectedValue(new Error('Error'));

      const result = await fetchSummaryLeaves();

      expect(result).toEqual({
        success: false,
        message: ERROR_MESSAGE.SUMMARY_LEAVE_FAILED,
      });
    });
  });
});
