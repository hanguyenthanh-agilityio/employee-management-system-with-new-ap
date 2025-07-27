import { ERROR_MESSAGE } from '@/constants';
import { validateLeaveApplication } from './validate';

describe('validateLeaveApplication', () => {
  const validData = {
    type: 'Annual Leave',
    startDate: '2025-07-21',
    endDate: '2025-07-23',
    durations: 3,
    resumptionDate: '2025-07-24',
    reason: 'Vacation',
    users_permissions_user: 1,
    employeeName: 'John Doe',
    document: null,
  };

  // Mock current time
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2025-07-20T00:00:00Z'));
  });

  it('returns parsed data if valid', () => {
    const result = validateLeaveApplication(validData);
    expect(result).toEqual(validData);
  });

  it('throws error if data is invalid', () => {
    const invalidData = {
      ...validData,
      startDate: 'invalid-date',
    };

    expect(() => validateLeaveApplication(invalidData)).toThrow(
      ERROR_MESSAGE.ACTIVATION_FAILED,
    );
  });

  it('throws error if data is missing required field', () => {
    const missingFieldData = {
      startDate: '2025-07-21',
      endDate: '2025-07-23',
      durations: 3,
      resumptionDate: '2025-07-24',
      reason: 'Vacation',
    };

    expect(() => validateLeaveApplication(missingFieldData)).toThrow(
      ERROR_MESSAGE.ACTIVATION_FAILED,
    );
  });
});
