import { NEXT_PUBLIC_API_URL } from '@/constants';
import { getAvatarUrl } from './avatar';

describe('getAvatarUrl', () => {
  beforeAll(() => {
    // Mock createObjectURL
    URL.createObjectURL = jest.fn(() => 'mocked-object-url');
    process.env.NEXT_PUBLIC_API_URL = 'https://mocked-api.com';
  });
  test('Returns object URL if input is File', () => {
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    const result = getAvatarUrl(file);

    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    expect(result).toBe('mocked-object-url');
  });

  test('Returns full URL if input is array url', () => {
    const input = [{ url: '/uploads/avatar.png' }];
    const result = getAvatarUrl(input);

    expect(result).toBe(`${NEXT_PUBLIC_API_URL}/uploads/avatar.png`);
  });

  test('Returns string if input is string', () => {
    const input = 'https://example.com/avatar.png';
    const result = getAvatarUrl(input);

    expect(result).toBe(input);
  });

  test('Returns undefined if input is null', () => {
    const result = getAvatarUrl(null);

    expect(result).toBeUndefined();
  });
});
