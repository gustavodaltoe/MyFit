import UserDto from '../dtos/UserDto';
import api, { setApiAuthToken } from './api';
import storageService from './storageService';

export default {
  async register(email: string, password: string): Promise<UserDto> {
    const { data } = await api.post('api/auth/register', {
      email,
      password,
    });
    return data;
  },

  async login(email: string, password: string): Promise<UserDto> {
    const { data } = await api.post('api/auth/login', {
      email,
      password,
    });

    storageService.setAuthToken(data.accessToken);
    setApiAuthToken(data.accessToken);

    const authProfile = await this.getProfile();
    storageService.setUserProfile(authProfile);

    return authProfile;
  },

  async getProfile(): Promise<UserDto> {
    const { data } = await api.get('/api/auth/profile');
    storageService.setUserProfile(data);

    return data;
  },

  async logout(): Promise<void> {
    storageService.setAuthToken(null);
  },

  isAuthenticated(): boolean {
    return storageService.getAuthToken() !== null;
  },

  async resendConfirmationEmail(email: string): Promise<void | string> {
    const { data } = await api.post('api/auth/email/resend', {
      email,
    });
    return data;
  },

  async verifyEmail(token: string): Promise<void> {
    return api.patch(`api/auth/email/verify/${token}`);
  },
};
