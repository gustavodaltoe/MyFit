import React, { createContext, useContext, useEffect, useState } from 'react';
import UserDto from '../dtos/UserDto';
import User from '../interfaces/user';
import { setApiAuthToken } from '../services/api';
import authService from '../services/authService';
import storageService from '../services/storageService';
import userService from '../services/userService';

export interface IAuthContext {
  isAuthenticated: boolean;
  user: User;
  isLoading: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  refresh(): void;
  setUser(userData: UserDto): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storageUser = storageService.getUserProfile();
    const storageToken = storageService.getAuthToken();

    if (storageUser && storageToken) {
      setUser(storageUser);
      setApiAuthToken(storageToken);
    }

    setIsLoading(false);
  }, []);

  function setAndStoreUser(userData: UserDto) {
    const necessities = userData.profile
      ? userService.calcProfileNecessities(userData.profile)
      : null;

    const userToStore = { info: userData.id ? userData : null, necessities };
    setUser(userToStore as User);
    storageService.setUserProfile(userToStore as User);
  }

  async function login(email: string, password: string) {
    const authUser = await authService.login(email, password);
    setAndStoreUser(authUser);
  }

  async function logout() {
    setAndStoreUser({} as UserDto);
  }

  async function refresh() {
    const authenticatedUser = await authService.getProfile();
    setAndStoreUser(authenticatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user.info,
        isLoading,
        user,
        login,
        logout,
        refresh,
        setUser: setAndStoreUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthContext, useAuth };
