// Utils
import { setCookie, removeCookie } from '@/utils/auth';

// Constants
import { ERROR_MESSAGE } from '@/constants';

// Actions
import { loginAction, logoutAction, registerAction } from '../auth-action';

// Services
import { loginUser, registerUser } from '@/services/auth/authService';
import { getCurrentUser } from '@/services/user/userService';

jest.mock('@/services/auth/authService');
jest.mock('@/services/user/userService');
jest.mock('@/utils/auth');
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));
describe('authActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginAction', () => {
    test('Should return error if form data is invalid', async () => {
      const result = await loginAction({}, { email: '', password: '' });

      expect(result).toEqual({
        success: false,
        message: expect.stringContaining('Email'),
      });
      expect(loginUser).not.toHaveBeenCalled();
    });

    test('Should return error if login failed (missing jwt)', async () => {
      (loginUser as jest.Mock).mockResolvedValueOnce({});

      const result = await loginAction(
        {},
        { email: 'hanguyen@mail.com', password: '123456' },
      );

      expect(result).toEqual({
        success: false,
        message: ERROR_MESSAGE.INVALID_CREDENTIALS,
      });
    });

    test('Should login successfully and set cookies', async () => {
      (loginUser as jest.Mock).mockResolvedValueOnce({ jwt: 'token123' });
      (getCurrentUser as jest.Mock).mockResolvedValueOnce({
        id: 1,
        email: 'hanguyen@mail.com',
      });

      const result = await loginAction(
        {},
        { email: 'hanguyen@mail.com', password: '123456' },
      );

      expect(setCookie).toHaveBeenCalledWith(
        'jwtToken',
        'token123',
        expect.any(Object),
      );
      expect(result).toEqual({
        success: true,
        data: { id: 1, email: 'hanguyen@mail.com' },
      });
    });

    test('Should return error if exception is thrown', async () => {
      (loginUser as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));

      const result = await loginAction(
        {},
        { email: 'test@mail.com', password: '123456' },
      );

      expect(result).toEqual({
        success: false,
        message: 'Login failed',
      });
    });
  });

  describe('logoutAction', () => {
    test('Should remove jwtToken cookie', async () => {
      const result = await logoutAction();

      expect(removeCookie).toHaveBeenCalledWith('jwtToken');
      expect(result).toEqual({ success: true });
    });
  });

  describe('registerAction', () => {
    const mock = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'hanguyen@example.com',
      password: '123456',
      phone: '0123456789',
      confirmPassword: '123456',
      newsletter: false,
      terms: true,
    };

    test('Should register successfully with full name', async () => {
      (registerUser as jest.Mock).mockResolvedValueOnce({
        message: 'Welcome!',
      });

      const result = await registerAction(mock);

      expect(registerUser).toHaveBeenCalledWith({
        username: 'JohnDoe',
        email: 'hanguyen@example.com',
        password: '123456',
      });

      expect(result).toEqual({
        success: true,
        message: 'Welcome!',
      });
    });

    test('Should return error if registration fails', async () => {
      (registerUser as jest.Mock).mockRejectedValueOnce(
        new Error('Register failed'),
      );
      const result = await registerAction(mock);

      expect(result).toEqual({
        success: false,
        message: 'Register failed',
      });
    });

    test('Should fallback to email if full name is empty', async () => {
      (registerUser as jest.Mock).mockResolvedValueOnce({
        message: 'Registered',
      });

      const result = await registerAction({
        firstName: '',
        lastName: '',
        email: 'hanguyen@gmail.com',
        password: '123456',
        phone: '',
        confirmPassword: '123456',
        terms: true,
      });

      expect(registerUser).toHaveBeenCalledWith({
        username: 'hanguyen@gmail.com',
        email: 'hanguyen@gmail.com',
        password: '123456',
      });

      expect(result).toEqual({
        success: true,
        message: 'Registered',
      });
    });

    test('Should return default error if unknown error is thrown', async () => {
      (registerUser as jest.Mock).mockRejectedValueOnce('Some unknown error');

      const result = await registerAction(mock);

      expect(result).toEqual({
        success: false,
        message: ERROR_MESSAGE.UNKNOWN_REGISTER,
      });
    });
  });
});
