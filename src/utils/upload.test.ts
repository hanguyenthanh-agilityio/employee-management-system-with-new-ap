import { ERROR_MESSAGE } from '@/constants';
import { uploadFileToStrapi } from './upload';

jest.mock('@/utils/auth', () => ({
  getTokenFromCookies: jest.fn(() => Promise.resolve('test-token')),
}));

describe('uploadFileToStrapi', () => {
  // Create fake object file to test upload
  const mockFile = new File(['test content'], 'test.pdf', {
    type: 'application/pdf',
  });

  // Each test will fetch mock form global
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('Uploads file and returns file id', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [{ id: 456 }],
    });

    const result = await uploadFileToStrapi(mockFile);
    expect(result).toBe('456');
  });

  test('Throws error if upload fails', async () => {
    // mockResolvedValue: fetch success, response error
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    // uploadFileToStrapi(mockFile) return Promise
    const result = uploadFileToStrapi(mockFile);

    await expect(result).rejects.toThrow(ERROR_MESSAGE.UPLOAD_FAILED);
  });
});
