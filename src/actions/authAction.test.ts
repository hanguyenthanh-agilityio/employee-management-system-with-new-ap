import { getCurrentUser, login, register } from '@/services';
import { setCookie, removeCookie } from '@/utils/auth';
import { ERROR_MESSAGE } from '@/constants';
import { loginAction, logoutAction, registerAction } from './auth-action';

jest.mock('@/services');
jest.mock('@/utils/auth');

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
      expect(login).not.toHaveBeenCalled();
    });

    test('Should return error if login failed (missing jwt)', async () => {
      (login as jest.Mock).mockResolvedValueOnce({});

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
      (login as jest.Mock).mockResolvedValueOnce({ jwt: 'token123' });
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
      (login as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));

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
      (register as jest.Mock).mockResolvedValueOnce({ message: 'Welcome!' });

      const result = await registerAction(mock);

      expect(register).toHaveBeenCalledWith({
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
      (register as jest.Mock).mockRejectedValueOnce(
        new Error('Register failed'),
      );
      const result = await registerAction(mock);

      expect(result).toEqual({
        success: false,
        message: 'Register failed',
      });
    });
  });
});
