import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../../contexts/UserAuthContext';

export const UserProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useUserAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#022C22] text-white">
        <div className="w-10 h-10 border-3 border-[#D6A84F]/30 border-t-[#D6A84F] rounded-full animate-spin mb-3" />
        <p className="text-xs font-heading font-semibold tracking-wider text-[#D6A84F]">
          Loading Your Account...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

