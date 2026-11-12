import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserAppointment,
  UserMessage,
  UserNotification,
  UserReview,
  UserPaymentRecord,
} from '../types/user';
import { Property } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { initialProperties } from '../data/initialData';
import { userService } from '../services/userService';

interface UserAuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (
    fullName: string,
    email: string,
    phone: string,
    pass: string,
    city?: string,
    address?: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (profileData?: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  loginWithGitHub: (profileData?: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  changePassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;

  // Saved properties
  savedPropertyIds: string[];
  savedProperties: Property[];
  toggleSaveProperty: (propertyId: string) => void;
  isPropertySaved: (propertyId: string) => boolean;

  // User-owned / managed properties
  userProperties: Property[];

  // Appointments
  appointments: UserAppointment[];
  bookAppointment: (apt: Omit<UserAppointment, 'id' | 'userId' | 'createdAt' | 'status'>) => void;
  cancelAppointment: (id: string) => void;

  // Messages
  messages: UserMessage[];
  sendMessage: (content: string, propertyTitle?: string) => void;

  // Notifications
  notifications: UserNotification[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;

  // Reviews
  reviews: UserReview[];
  addReview: (review: Omit<UserReview, 'id' | 'userId' | 'date' | 'status'>) => void;

  // Payments
  paymentRecords: UserPaymentRecord[];
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

const USER_SESSION_KEY = 'PESHAWER_USER_SESSION_V2';
const ALL_APPOINTMENTS_KEY = 'PESHAWER_ALL_APPOINTMENTS_V2';
const ALL_MESSAGES_KEY = 'PESHAWER_ALL_MESSAGES_V2';
const ALL_NOTIFICATIONS_KEY = 'PESHAWER_ALL_NOTIFICATIONS_V2';

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current authenticated user session (strictly null if not logged in)
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(USER_SESSION_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Refresh with latest data from userService if available
        const latest = userService.getUserById(parsed.id) || userService.getUserByEmail(parsed.email);
        return latest || parsed;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Saved properties state for current user
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    if (!user) return [];
    return user.savedPropertyIds || [];
  });

  // Global appointments pool
  const [allAppointments, setAllAppointments] = useState<UserAppointment[]>(() => {
    const saved = localStorage.getItem(ALL_APPOINTMENTS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Seed initial appointments for demo Mohsin Ahmad
    return [
      {
        id: 'apt-1',
        userId: 'usr-mohsin-ahmad-01',
        propertyOrProjectTitle: 'Town Garden - Executive Luxury Villa',
        type: 'Property',
        targetSlug: 'town-garden-executive-luxury-villa-university-town',
        location: 'University Town, Peshawar',
        date: '2026-11-12',
        time: '03:00 PM',
        status: 'Confirmed',
        contactPhone: '+92 300 1234567',
        message: 'Site visit for villa layout and private garden inspection.',
        createdAt: '2026-11-01T12:00:00Z',
      },
    ];
  });

  // Global messages pool
  const [allMessages, setAllMessages] = useState<UserMessage[]>(() => {
    const saved = localStorage.getItem(ALL_MESSAGES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'msg-1',
        userId: 'usr-mohsin-ahmad-01',
        senderName: 'Peshawer Realty Advisory',
        senderRole: 'Agent',
        propertyTitle: 'Town Garden Luxury Villa',
        content: 'Your requested floor plan and video walkthrough have been verified. Our consultant is ready to assist you.',
        timestamp: '10:30 AM',
        read: false,
      },
    ];
  });

  // Notifications pool
  const [allNotifications, setAllNotifications] = useState<UserNotification[]>(() => {
    const saved = localStorage.getItem(ALL_NOTIFICATIONS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Reviews & Payments
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [paymentRecords] = useState<UserPaymentRecord[]>([]);

  // Keep state synchronized with active user
  useEffect(() => {
    if (user) {
      setSavedPropertyIds(user.savedPropertyIds || []);
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    } else {
      setSavedPropertyIds([]);
      localStorage.removeItem(USER_SESSION_KEY);
    }
    setIsLoading(false);
  }, [user]);

  // Sync global collections to storage
  useEffect(() => {
    localStorage.setItem(ALL_APPOINTMENTS_KEY, JSON.stringify(allAppointments));
  }, [allAppointments]);

  useEffect(() => {
    localStorage.setItem(ALL_MESSAGES_KEY, JSON.stringify(allMessages));
  }, [allMessages]);

  useEffect(() => {
    localStorage.setItem(ALL_NOTIFICATIONS_KEY, JSON.stringify(allNotifications));
  }, [allNotifications]);

  // Listen for external updates from other tabs or admin actions
  useEffect(() => {
    const handleUserUpdate = () => {
      if (user) {
        const fresh = userService.getUserById(user.id);
        if (fresh) {
          setUser(fresh);
        }
      }
    };
    window.addEventListener('peshawer_users_updated', handleUserUpdate);
    return () => window.removeEventListener('peshawer_users_updated', handleUserUpdate);
  }, [user]);

  // Listen for Supabase session if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatarUrl: session.user.user_metadata?.avatar_url,
            phone: session.user.user_metadata?.phone || '+92 300 1234567',
            city: 'Peshawar',
            address: 'Peshawar, Khyber Pakhtunkhwa',
            role: 'customer',
            provider: (session.user.app_metadata?.provider as any) || 'email',
            createdAt: session.user.created_at,
          };
          const saved = userService.saveUser(profile);
          setUser(saved);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  // LOGIN (Email & Password)
  const login = async (
    email: string,
    _pass: string,
    _rememberMe?: boolean
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists in central user repository
    let existing = userService.getUserByEmail(cleanEmail);

    if (!existing) {
      // Auto-register new user cleanly
      const name = cleanEmail
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      existing = userService.saveUser({
        id: `usr-${Date.now()}`,
        fullName: name,
        email: cleanEmail,
        phone: '+92 300 1234567',
        city: 'Peshawar',
        address: 'University Town, Peshawar',
        role: 'customer',
        provider: 'email',
        createdAt: new Date().toISOString(),
        savedPropertyIds: [],
        ownedPropertyIds: [],
      });
    } else {
      // Update last active
      existing = userService.saveUser({
        ...existing,
        lastLoginAt: new Date().toISOString(),
      });
    }

    setUser(existing);
    setIsLoading(false);
    return { success: true };
  };

  // SIGNUP
  const signup = async (
    fullName: string,
    email: string,
    phone: string,
    _pass: string,
    city?: string,
    address?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 500));

    const cleanEmail = email.toLowerCase().trim();

    const newUser = userService.saveUser({
      id: `usr-${Date.now()}`,
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim() || '+92 300 1234567',
      city: city?.trim() || 'Peshawar',
      address: address?.trim() || 'University Town, Peshawar',
      role: 'customer',
      provider: 'email',
      createdAt: new Date().toISOString(),
      savedPropertyIds: [],
      ownedPropertyIds: [],
    });

    setUser(newUser);
    setIsLoading(false);
    return { success: true };
  };

  // GOOGLE OAUTH
  const loginWithGoogle = async (profileData?: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const targetEmail = (profileData?.email || 'mohsin.ahmad.dev@gmail.com').toLowerCase().trim();
    const existing = userService.getUserByEmail(targetEmail);

    const userToSave: UserProfile = {
      id: existing?.id || `usr-google-${Date.now()}`,
      fullName: profileData?.fullName || existing?.fullName || 'Mohsin Ahmad',
      email: targetEmail,
      phone: profileData?.phone || existing?.phone || '+92 300 1234567',
      city: profileData?.city || existing?.city || 'Peshawar',
      address: profileData?.address || existing?.address || 'University Town, Peshawar',
      avatarUrl:
        profileData?.avatarUrl ||
        existing?.avatarUrl ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80',
      role: existing?.role || 'customer',
      provider: 'google',
      createdAt: existing?.createdAt || new Date().toISOString(),
      savedPropertyIds: existing?.savedPropertyIds || [],
      ownedPropertyIds: existing?.ownedPropertyIds || [],
    };

    const saved = userService.saveUser(userToSave);
    setUser(saved);
    setIsLoading(false);
    return { success: true };
  };

  // GITHUB OAUTH
  const loginWithGitHub = async (profileData?: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const targetEmail = (profileData?.email || 'mohsin-ahmad@github.com').toLowerCase().trim();
    const existing = userService.getUserByEmail(targetEmail);

    const userToSave: UserProfile = {
      id: existing?.id || `usr-github-${Date.now()}`,
      fullName: profileData?.fullName || existing?.fullName || 'Mohsin Ahmad',
      email: targetEmail,
      phone: profileData?.phone || existing?.phone || '+92 300 1234567',
      city: profileData?.city || existing?.city || 'Peshawar',
      address: profileData?.address || existing?.address || 'Peshawar, Khyber Pakhtunkhwa',
      avatarUrl:
        profileData?.avatarUrl ||
        existing?.avatarUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80',
      role: existing?.role || 'customer',
      provider: 'github',
      createdAt: existing?.createdAt || new Date().toISOString(),
      savedPropertyIds: existing?.savedPropertyIds || [],
      ownedPropertyIds: existing?.ownedPropertyIds || [],
    };

    const saved = userService.saveUser(userToSave);
    setUser(saved);
    setIsLoading(false);
    return { success: true };
  };

  // LOGOUT
  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(USER_SESSION_KEY);
  };

  // UPDATE PROFILE
  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'No active session' };
    const updated = userService.updateUser(user.id, updates);
    if (updated) {
      setUser(updated);
      return { success: true };
    }
    return { success: false, error: 'Failed to update profile' };
  };

  // CHANGE PASSWORD
  const changePassword = async (_currentPass: string, _newPass: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 300));
    return { success: true };
  };

  // SAVED PROPERTIES (strictly scoped to current user)
  const toggleSaveProperty = (propertyId: string) => {
    setSavedPropertyIds((prev) => {
      const next = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];

      if (user) {
        userService.updateUser(user.id, { savedPropertyIds: next });
        setUser((prevU) => (prevU ? { ...prevU, savedPropertyIds: next } : null));
      }
      return next;
    });
  };

  const isPropertySaved = (propertyId: string) => savedPropertyIds.includes(propertyId);

  const savedProperties = initialProperties.filter((p) => savedPropertyIds.includes(p.id));

  // USER PROPERTIES (Owned / acquired properties of the logged-in user)
  const userProperties = user?.ownedPropertyIds?.length
    ? initialProperties.filter((p) => user.ownedPropertyIds?.includes(p.id))
    : user?.email === 'mohsin@peshawer.com'
    ? initialProperties.slice(0, 3)
    : [];

  // APPOINTMENTS (strictly filtered by active user id or email)
  const appointments = allAppointments.filter(
    (a) => a.userId === user?.id || (user?.email && a.contactPhone === user.phone)
  );

  const bookAppointment = (aptData: Omit<UserAppointment, 'id' | 'userId' | 'createdAt' | 'status'>) => {
    const newApt: UserAppointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      userId: user?.id || 'guest',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setAllAppointments((prev) => [newApt, ...prev]);

    const newNotif: UserNotification = {
      id: `notif-${Date.now()}`,
      userId: user?.id || 'guest',
      title: 'Appointment Request Submitted',
      description: `Your request for ${aptData.propertyOrProjectTitle} has been received.`,
      timestamp: 'Just now',
      read: false,
      type: 'appointment',
      link: '/user/appointments',
    };
    setAllNotifications((prev) => [newNotif, ...prev]);
  };

  const cancelAppointment = (id: string) => {
    setAllAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'Cancelled' as const } : apt))
    );
  };

  // MESSAGES (strictly filtered by active user)
  const messages = allMessages.filter((m) => m.userId === user?.id);

  const sendMessage = (content: string, propertyTitle?: string) => {
    const newMsg: UserMessage = {
      id: `msg-${Date.now()}`,
      userId: user?.id || 'guest',
      senderName: user?.fullName || 'Client',
      senderRole: 'User',
      propertyTitle: propertyTitle || 'General Inquiry',
      content,
      timestamp: 'Just now',
      read: true,
    };
    setAllMessages((prev) => [...prev, newMsg]);
  };

  // NOTIFICATIONS (filtered by active user)
  const userNotifications = allNotifications.filter((n) => n.userId === user?.id);
  const unreadNotificationsCount = userNotifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setAllNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // REVIEWS
  const addReview = (revData: Omit<UserReview, 'id' | 'userId' | 'date' | 'status'>) => {
    const newRev: UserReview = {
      ...revData,
      id: `rev-${Date.now()}`,
      userId: user?.id || 'guest',
      date: 'Just now',
      status: 'Published',
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        loginWithGitHub,
        logout,
        updateProfile,
        changePassword,
        savedPropertyIds,
        savedProperties,
        toggleSaveProperty,
        isPropertySaved,
        userProperties,
        appointments,
        bookAppointment,
        cancelAppointment,
        messages,
        sendMessage,
        notifications: userNotifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        reviews,
        addReview,
        paymentRecords,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};
