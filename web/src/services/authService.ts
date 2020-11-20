import UserDto from '../dtos/UserDto';
import api, { setApiAuthToken } from './api';
import storageService from './storageService';

async function register(email: string, password: string): Promise<UserDto> {
  const { data } = await api.post('api/auth/register', {
    email,
    password,
  });
  return data;
}

async function getProfile(): Promise<UserDto> {
  const { data } = await api.get('/api/auth/profile');

  return data;
}

async function login(email: string, password: string): Promise<UserDto> {
  const { data } = await api.post('api/auth/login', {
    email,
    password,
  });

  storageService.setAuthToken(data.accessToken);
  setApiAuthToken(data.accessToken);

  const authProfile = await getProfile();

  return authProfile;
}

async function resendConfirmationEmail(email: string): Promise<void | string> {
  const { data } = await api.post('api/auth/email/resend', {
    email,
  });
  return data;
}

async function verifyEmail(token: string): Promise<void> {
  return api.patch(`api/auth/email/verify/${token}`);
}

export default {
  register,
  login,
  getProfile,
  verifyEmail,
  resendConfirmationEmail,
};
