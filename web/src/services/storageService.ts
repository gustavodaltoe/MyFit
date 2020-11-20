import UserDto from '../dtos/UserDto';

const AUTH_TOKEN_KEY = 'authToken';
const USER_PROFILE_KEY = 'userProfile';

export default {
  getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  setAuthToken(token: string | null): void {
    if (!token) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return;
    }
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  getUserProfile(): UserDto | null {
    const userProfileStringified = localStorage.getItem(USER_PROFILE_KEY);
    return userProfileStringified ? JSON.parse(userProfileStringified) : null;
  },

  setUserProfile(user: UserDto | null): void {
    if (!user) {
      localStorage.removeItem(USER_PROFILE_KEY);
      return;
    }
    const userProfileStringified = JSON.stringify(user);
    localStorage.setItem(USER_PROFILE_KEY, userProfileStringified);
  },

  clear(): void {
    localStorage.clear();
  },
};
