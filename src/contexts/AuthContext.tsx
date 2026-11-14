import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { defaultAdminUser } from '../data/initialData';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'PESHAWER_REAL_ESTATE_ADMIN_SESSION';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Enforce: Always require login when entering admin dashboard
    // Purge any stored sessions so login is mandatory every time
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // safe
    }
    setUser(null);
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string, _rememberMe: boolean = false): Promise<{ success: boolean; error?: string }> => {
    // Quick authentication check
    await new Promise((res) => setTimeout(res, 300));

    const cleanEmail = email.toLowerCase().trim();

    // Strict Admin credentials
    if (cleanEmail === 'info@peshawars.com' && pass === 'khan1122') {
      const authUser: AdminUser = {
        ...defaultAdminUser,
        email: 'info@peshawars.com',
      };
      setUser(authUser);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Access denied.',
    };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // safe
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
