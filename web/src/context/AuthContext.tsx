import React, { createContext, useContext, useEffect, useState } from 'react';
import UserDto from '../dtos/UserDto';
import { setApiAuthToken } from '../services/api';
import authService from '../services/authService';
import storageService from '../services/storageService';

export interface IAuthContext {
  isAuthenticated: boolean;
  user: UserDto;
  isLoading: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  refresh(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserDto>({} as UserDto);
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

  async function login(email: string, password: string) {
    const authUser = await authService.login(email, password);
    setUser(authUser);
  }

  async function logout() {
    storageService.clear();
    setUser({} as UserDto);
  }

  async function refresh() {
    const authenticatedUser = await authService.getProfile();
    setUser(authenticatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user.id,
        isLoading,
        user,
        login,
        logout,
        refresh,
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
