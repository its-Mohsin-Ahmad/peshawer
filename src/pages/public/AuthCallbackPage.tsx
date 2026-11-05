import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          navigate('/user/dashboard', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      });
    } else {
      navigate('/user/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#022C22] text-white">
      <div className="w-12 h-12 border-3 border-[#D6A84F]/30 border-t-[#D6A84F] rounded-full animate-spin mb-4" />
      <p className="text-sm font-heading font-semibold tracking-wider text-[#D6A84F]">
        Authenticating with Peshawer Real Estate...
      </p>
    </div>
  );
};

