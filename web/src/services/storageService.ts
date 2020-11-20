import UserDto from '../dtos/UserDto';

const AUTH_TOKEN_KEY = 'authToken';
const USER_PROFILE_KEY = 'userProfile';

function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function setAuthToken(token: string | null): void {
  if (!token) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return;
  }
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function getUserProfile(): UserDto | null {
  const userProfileStringified = localStorage.getItem(USER_PROFILE_KEY);
  return userProfileStringified ? JSON.parse(userProfileStringified) : null;
}

function setUserProfile(user: UserDto | null): void {
  if (!user) {
    localStorage.removeItem(USER_PROFILE_KEY);
    return;
  }
  const userProfileStringified = JSON.stringify(user);
  localStorage.setItem(USER_PROFILE_KEY, userProfileStringified);
}

function clear(): void {
  localStorage.clear();
}

export default {
  getAuthToken,
  setAuthToken,
  getUserProfile,
  setUserProfile,
  clear,
};
