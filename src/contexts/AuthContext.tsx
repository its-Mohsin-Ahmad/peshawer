import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { defaultAdminUser } from '../data/initialData';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'PESHAWER_REAL_ESTATE_ADMIN_SESSION';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network authentication delay for realism
    await new Promise((res) => setTimeout(res, 600));

    const cleanEmail = email.toLowerCase().trim();
    // Admin authentication verification: requires valid admin email / Gmail and master password
    const isAuthorizedAdminEmail =
      cleanEmail.includes('@') &&
      (cleanEmail === 'info@peshawars.com' ||
        cleanEmail === 'admin@peshawars.com' ||
        cleanEmail === 'admin@peshawerrealestate.com' ||
        cleanEmail === 'admin@peshawer.com' ||
        cleanEmail.endsWith('@gmail.com') ||
        cleanEmail.includes('peshawar') ||
        cleanEmail.includes('peshawer'));

    if (
      isAuthorizedAdminEmail &&
      (pass === 'admin123456' || pass === 'admin123')
    ) {
      const authUser: AdminUser = {
        ...defaultAdminUser,
        email: cleanEmail,
      };
      setUser(authUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Access denied.',
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
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

