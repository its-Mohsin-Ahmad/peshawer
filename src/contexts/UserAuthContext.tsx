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

interface UserAuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginWithGitHub: () => Promise<{ success: boolean; error?: string }>;
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

const USER_SESSION_KEY = 'PESHAWER_USER_SESSION_V1';
const USER_SAVED_PROPERTIES_KEY = 'PESHAWER_USER_SAVED_PROPERTIES_V1';
const USER_APPOINTMENTS_KEY = 'PESHAWER_USER_APPOINTMENTS_V1';
const USER_MESSAGES_KEY = 'PESHAWER_USER_MESSAGES_V1';
const USER_NOTIFICATIONS_KEY = 'PESHAWER_USER_NOTIFICATIONS_V1';

// Default Demo User matching the Reference Screenshot (Mohsin Ahmad)
const defaultDemoUser: UserProfile = {
  id: 'usr-mohsin-ahmad-01',
  fullName: 'Mohsin Ahmad',
  email: 'mohsin@peshawer.com',
  phone: '+92 300 1234567',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80',
  city: 'Peshawar',
  address: 'University Town, Peshawar',
  role: 'customer',
  provider: 'email',
  createdAt: '2026-05-10T10:00:00Z',
};

const initialDemoAppointments: UserAppointment[] = [
  {
    id: 'apt-1',
    userId: defaultDemoUser.id,
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
  {
    id: 'apt-2',
    userId: defaultDemoUser.id,
    propertyOrProjectTitle: 'Glamorous Heights Kalam',
    type: 'Project',
    targetSlug: 'glamorous-heights',
    location: 'Kalam',
    date: '2026-11-18',
    time: '11:30 AM',
    status: 'Pending',
    contactPhone: '+92 300 1234567',
    message: 'Review 5th floor 2-bed apartment unit and installment paperwork.',
    createdAt: '2026-11-03T09:30:00Z',
  },
];

const initialDemoMessages: UserMessage[] = [
  {
    id: 'msg-1',
    userId: defaultDemoUser.id,
    senderName: 'Tariq Khan (Senior Advisor)',
    senderRole: 'Agent',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces&q=80',
    propertyTitle: 'Town Garden Executive Villa',
    content: 'Hello Mohsin, your on-site walkthrough for Town Garden is confirmed for Thursday at 3:00 PM. Our engineer will meet you at the central gate.',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: 'msg-2',
    userId: defaultDemoUser.id,
    senderName: 'Peshawer Client Desk',
    senderRole: 'Agent',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=80',
    propertyTitle: 'Payment Schedule',
    content: 'Your installment receipt for Glamorous Heights has been verified and registered in your account.',
    timestamp: '1 day ago',
    read: false,
  },
  {
    id: 'msg-3',
    userId: defaultDemoUser.id,
    senderName: 'Asadullah (Engineering Lead)',
    senderRole: 'Agent',
    propertyTitle: 'Construction Milestone',
    content: 'The 83% completion milestone report for Town Garden has been uploaded. You can review the video walkthrough anytime.',
    timestamp: '3 days ago',
    read: false,
  },
];

const initialDemoNotifications: UserNotification[] = [
  {
    id: 'notif-1',
    userId: defaultDemoUser.id,
    title: 'Appointment Confirmed',
    description: 'Your visit for Town Garden Executive Villa has been confirmed for Nov 12 at 3:00 PM.',
    timestamp: '2 hours ago',
    read: false,
    type: 'appointment',
    link: '/user/appointments',
  },
  {
    id: 'notif-2',
    userId: defaultDemoUser.id,
    title: 'New Message from Agent',
    description: 'Tariq Khan sent you a walkthrough instruction note regarding Town Garden.',
    timestamp: '5 hours ago',
    read: false,
    type: 'message',
    link: '/user/messages',
  },
];

const initialDemoReviews: UserReview[] = [
  {
    id: 'rev-1',
    userId: defaultDemoUser.id,
    propertyOrProjectTitle: 'Town Garden Peshawar',
    rating: 5,
    comment: 'Exceptional architectural standard and flawless client facilitation. The video walkthrough matched reality on-site.',
    date: '3 days ago',
    status: 'Published',
  },
];

const initialDemoPayments: UserPaymentRecord[] = [
  {
    id: 'pay-1',
    userId: defaultDemoUser.id,
    referenceNumber: 'PKR-TOWNGARDEN-B01',
    propertyOrProjectTitle: 'Town Garden - Executive Luxury Villa',
    amountPKR: 3500000,
    date: '2026-10-15',
    status: 'Verified',
    installmentType: 'Booking',
  },
  {
    id: 'pay-2',
    userId: defaultDemoUser.id,
    referenceNumber: 'PKR-GLAMOROUS-INS01',
    propertyOrProjectTitle: 'Glamorous Heights Kalam',
    amountPKR: 1200000,
    date: '2026-10-28',
    status: 'Verified',
    installmentType: 'Monthly Installment',
  },
];

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(USER_SESSION_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default demo login for seamless instant preview matching reference image
    return defaultDemoUser;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Saved properties state (Array of IDs)
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(USER_SAVED_PROPERTIES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['prop-town-garden-villa', 'prop-glamorous-heights-apt'];
      }
    }
    // Default initial saved properties for Mohsin Ahmad
    return ['prop-town-garden-villa', 'prop-glamorous-heights-apt', 'prop-kalam-cottage-chalet', 'prop-corner-apartments-kalam'];
  });

  // Appointments
  const [appointments, setAppointments] = useState<UserAppointment[]>(() => {
    const saved = localStorage.getItem(USER_APPOINTMENTS_KEY);
    return saved ? JSON.parse(saved) : initialDemoAppointments;
  });

  // Messages
  const [messages, setMessages] = useState<UserMessage[]>(() => {
    const saved = localStorage.getItem(USER_MESSAGES_KEY);
    return saved ? JSON.parse(saved) : initialDemoMessages;
  });

  // Notifications
  const [notifications, setNotifications] = useState<UserNotification[]>(() => {
    const saved = localStorage.getItem(USER_NOTIFICATIONS_KEY);
    return saved ? JSON.parse(saved) : initialDemoNotifications;
  });

  // Reviews
  const [reviews, setReviews] = useState<UserReview[]>(initialDemoReviews);

  // Payments
  const [paymentRecords] = useState<UserPaymentRecord[]>(initialDemoPayments);

  // Listen for real Supabase auth state if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatarUrl: session.user.user_metadata?.avatar_url,
            role: 'customer',
            provider: (session.user.app_metadata?.provider as any) || 'email',
            createdAt: session.user.created_at,
          };
          setUser(profile);
          localStorage.setItem(USER_SESSION_KEY, JSON.stringify(profile));
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatarUrl: session.user.user_metadata?.avatar_url,
            role: 'customer',
            provider: (session.user.app_metadata?.provider as any) || 'email',
            createdAt: session.user.created_at,
          };
          setUser(profile);
          localStorage.setItem(USER_SESSION_KEY, JSON.stringify(profile));
        } else {
          // Keep demo user if not logged in to Supabase, or null
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_SESSION_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(USER_SAVED_PROPERTIES_KEY, JSON.stringify(savedPropertyIds));
  }, [savedPropertyIds]);

  useEffect(() => {
    localStorage.setItem(USER_APPOINTMENTS_KEY, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(USER_MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(USER_NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }, [notifications]);

  // LOGIN
  const login = async (
    email: string,
    pass: string,
    _rememberMe?: boolean
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));

    // Live Supabase Login if configured
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          fullName: data.user.user_metadata?.full_name || email.split('@')[0],
          email: data.user.email || email,
          avatarUrl: data.user.user_metadata?.avatar_url,
          role: 'customer',
          provider: 'email',
          createdAt: data.user.created_at,
        };
        setUser(profile);
        setIsLoading(false);
        return { success: true };
      }
    }

    // Client Authentication Check
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === 'mohsin@peshawer.com' || cleanEmail === 'user@peshawer.com' || cleanEmail.includes('mohsin')) {
      setUser(defaultDemoUser);
      setIsLoading(false);
      return { success: true };
    }

    // Allow user login with standard format
    const newProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email: cleanEmail,
      role: 'customer',
      provider: 'email',
      createdAt: new Date().toISOString(),
    };
    setUser(newProfile);
    setIsLoading(false);
    return { success: true };
  };

  // SIGNUP
  const signup = async (
    fullName: string,
    email: string,
    phone: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 700));

    // Live Supabase Signup if configured
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            full_name: fullName,
            phone,
          },
        },
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          fullName,
          email,
          phone,
          role: 'customer',
          provider: 'email',
          createdAt: data.user.created_at,
        };
        setUser(profile);
        setIsLoading(false);
        return { success: true };
      }
    }

    // Local account creation
    const newProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName,
      email: email.toLowerCase().trim(),
      phone,
      role: 'customer',
      provider: 'email',
      createdAt: new Date().toISOString(),
    };
    setUser(newProfile);
    setIsLoading(false);
    return { success: true };
  };

  // GOOGLE OAUTH
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }
      return { success: true };
    }

    // Fallback seamless simulation
    await new Promise((res) => setTimeout(res, 500));
    const googleUser: UserProfile = {
      id: 'usr-google-mohsin',
      fullName: 'Mohsin Ahmad',
      email: 'mohsin.ahmad.google@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80',
      role: 'customer',
      provider: 'google',
      city: 'Peshawar',
      address: 'University Town, Peshawar',
      createdAt: new Date().toISOString(),
    };
    setUser(googleUser);
    setIsLoading(false);
    return { success: true };
  };

  // GITHUB OAUTH
  const loginWithGitHub = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }
      return { success: true };
    }

    // Fallback seamless simulation
    await new Promise((res) => setTimeout(res, 500));
    const githubUser: UserProfile = {
      id: 'usr-github-mohsin',
      fullName: 'Mohsin Ahmad',
      email: 'mohsin@github.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80',
      role: 'customer',
      provider: 'github',
      city: 'Peshawar',
      address: 'University Town, Peshawar',
      createdAt: new Date().toISOString(),
    };
    setUser(githubUser);
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
    const updated = { ...user, ...updates, updatedAt: new Date().toISOString() };
    setUser(updated);
    return { success: true };
  };

  // CHANGE PASSWORD
  const changePassword = async (_currentPass: string, _newPass: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 400));
    return { success: true };
  };

  // SAVED PROPERTIES
  const toggleSaveProperty = (propertyId: string) => {
    setSavedPropertyIds((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const isPropertySaved = (propertyId: string) => savedPropertyIds.includes(propertyId);

  const savedProperties = initialProperties.filter((p) => savedPropertyIds.includes(p.id));

  // USER PROPERTIES (Properties matching user portfolio)
  const userProperties = initialProperties.slice(0, 3);

  // APPOINTMENTS
  const bookAppointment = (aptData: Omit<UserAppointment, 'id' | 'userId' | 'createdAt' | 'status'>) => {
    const newApt: UserAppointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      userId: user?.id || 'guest',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newApt, ...prev]);

    // Add notification
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
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'Cancelled' as const } : apt))
    );
  };

  // MESSAGES
  const sendMessage = (content: string, propertyTitle?: string) => {
    const newMsg: UserMessage = {
      id: `msg-${Date.now()}`,
      userId: user?.id || 'guest',
      senderName: user?.fullName || 'You',
      senderRole: 'User',
      propertyTitle: propertyTitle || 'General Inquiry',
      content,
      timestamp: 'Just now',
      read: true,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // NOTIFICATIONS
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
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
        notifications,
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

