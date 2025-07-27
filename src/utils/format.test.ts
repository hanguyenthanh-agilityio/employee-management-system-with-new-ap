import { formatTitleToPath } from './format';

describe('formatTitleToPath', () => {
  test('Should convert text to lowercase and replace spaces with hyphens', () => {
    expect(formatTitleToPath('Leave Applications')).toBe('leave-applications');
  });
});
