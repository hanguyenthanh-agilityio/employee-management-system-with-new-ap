/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteLeave,
  fetchLeaveApplicationById,
  fetchLeaveApplications,
  getSummaryLeaves,
  patchLeaveApplication,
  postLeaveApplication,
} from './leaveService';

jest.mock('@/utils/auth', () => ({
  getTokenFromCookies: jest.fn(() => Promise.resolve('test-token')),
}));

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

// Helper mock fetch success
const mockFetchSuccess = (data: any) => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
    headers: { get: jest.fn(() => 'application/json') },
  });
};

// Helper mock fetch failure
const mockFetchFailure = (status = 400, text = 'Error') => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status,
    text: async () => text,
    headers: { get: jest.fn(() => 'text/plain') },
  });
};

describe('leaveService', () => {
  describe('fetchLeaveApplications', () => {
    test('returns leave applications on success', async () => {
      const mockData = { data: ['application1', 'application2'] };
      mockFetchSuccess(mockData);

      const result = await fetchLeaveApplications(1);

      expect(result).toEqual(mockData);
    });

    test('throws error on fetch failure', async () => {
      mockFetchFailure();

      await expect(fetchLeaveApplications(1)).rejects.toThrow(
        'API Error 400: Error',
      );
    });
  });

  describe('fetchLeaveApplicationById', () => {
    test('fetches single leave application successfully', async () => {
      const mockData = { data: { id: '123' } };
      mockFetchSuccess(mockData);

      const result = await fetchLeaveApplicationById('123');

      expect(result).toEqual(mockData);
    });

    test('throws error on fetch failure', async () => {
      mockFetchFailure(404, 'Not Found');

      await expect(fetchLeaveApplicationById('invalid-id')).rejects.toThrow(
        'API Error 404: Not Found',
      );
    });
  });

  describe('fetchSummaryLeaves', () => {
    test('fetches summary leaves successfully', async () => {
      const mockData = { data: { annual: 10, sick: 5 } };
      mockFetchSuccess(mockData);

      const result = await getSummaryLeaves(1);

      expect(result).toEqual(mockData);
    });

    test('throws error on fetch failure', async () => {
      mockFetchFailure();

      await expect(getSummaryLeaves(1)).rejects.toThrow('API Error 400: Error');
    });
  });

  describe('createLeaveApplication', () => {
    test('creates leave application successfully', async () => {
      const payload = {
        data: {
          type: 'Annual Leave',
          startDate: '2025-07-27',
          endDate: '2025-07-28',
          durations: 2,
          resumptionDate: '2025-07-29',
          reason: 'Vacation',
        },
      };
      const mockResponse = { data: { id: 1 } };
      mockFetchSuccess(mockResponse);

      const result = await postLeaveApplication(payload);

      expect(result).toEqual(mockResponse);
    });

    test('throws error on failure', async () => {
      mockFetchFailure();

      const payload = { data: { type: 'Annual Leave' } };
      await expect(postLeaveApplication(payload)).rejects.toThrow(
        'API Error 400: Error',
      );
    });
  });

  describe('updateLeaveApplication', () => {
    test('updates leave application successfully', async () => {
      const payload = {
        type: 'Sick Leave',
        startDate: '2025-07-27',
        endDate: '2025-07-28',
        durations: 2,
        resumptionDate: '2025-07-29',
        reason: 'Illness',
      };
      const mockResponse = { data: { id: '123' } };
      mockFetchSuccess(mockResponse);

      const result = await patchLeaveApplication('123', payload);

      expect(result).toEqual(mockResponse);
    });

    test('throws error on failure', async () => {
      mockFetchFailure();

      const payload = { type: 'Sick Leave' };
      await expect(patchLeaveApplication('123', payload)).rejects.toThrow(
        'API Error 400: Error',
      );
    });
  });

  describe('deleteLeaveApplication', () => {
    test('deletes leave application successfully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => '',
        headers: { get: jest.fn(() => 'text/plain') },
      });

      const result = await deleteLeave('123');

      expect(result).toBe('123');
    });

    test('throws error when delete fails with message', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        text: async () => 'Delete failed',
        headers: { get: jest.fn(() => 'text/plain') },
      });

      await expect(deleteLeave('123')).rejects.toThrow('Delete failed');
    });

    test('throws generic error when delete fails with empty message', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        text: async () => '',
        headers: { get: jest.fn(() => 'text/plain') },
      });

      await expect(deleteLeave('123')).rejects.toThrow(
        'API Error undefined: Unknown error',
      );
    });
  });
});
