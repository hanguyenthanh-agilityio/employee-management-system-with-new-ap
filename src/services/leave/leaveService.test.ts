import {
  deleteLeave,
  getLeaveApplicationById,
  getLeaveApplications,
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

describe('leaveService', () => {
  describe('getLeaveApplications', () => {
    test('Should return leave applications when fetch success', async () => {
      const mockData = { data: ['application1', 'application2'] };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await getLeaveApplications(1);

      expect(result).toEqual(mockData);
    });
  });

  describe('getLeaveApplicationById', () => {
    test('Fetches a single leave application successfully', async () => {
      const mockData = { data: { id: '123' } };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await getLeaveApplicationById('123');

      expect(result).toEqual(mockData);
    });
  });

  describe('getSummaryLeave', () => {
    test('Fetch summary leave successfully', async () => {
      const mockData = { data: { annual: 10, sick: 5 } };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await getSummaryLeaves(1);

      expect(result).toEqual(mockData);
    });
  });

  describe('postLeaveApplication', () => {
    test('Creates leave application successfully', async () => {
      const body = {
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

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postLeaveApplication(body);

      expect(result).toEqual(mockResponse);
    });
  });

  describe('patchLeaveApplication', () => {
    test('updates application successfully', async () => {
      const data = {
        type: 'Sick Leave',
        startDate: '2025-07-27',
        endDate: '2025-07-28',
        durations: 2,
        resumptionDate: '2025-07-29',
        reason: 'Illness',
      };

      const mockResponse = { data: { id: '123' } };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
        headers: { get: () => 'application/json' },
      });

      const result = await patchLeaveApplication('123', data);

      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteLeave', () => {
    test('Deletes application successfully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => '',
      });

      const res = await deleteLeave('123');

      expect(res.ok).toBe(true);
    });
  });
});
