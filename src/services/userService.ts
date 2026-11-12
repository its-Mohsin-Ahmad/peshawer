import { UserProfile } from '../types/user';

const USERS_STORAGE_KEY = 'PESHAWER_REGISTERED_USERS_V2';

// Initial Seed Users (includes demo user Mohsin Ahmad and prominent Peshawar clients)
const INITIAL_REGISTERED_USERS: UserProfile[] = [
  {
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
    lastLoginAt: '2026-11-12T09:30:00Z',
    savedPropertyIds: ['prop-town-garden-villa', 'prop-glamorous-heights-apt'],
    ownedPropertyIds: ['prop-town-garden-villa'],
    status: 'active',
  },
  {
    id: 'usr-ali-khan-02',
    fullName: 'Ali Khan',
    email: 'ali.khan.peshawar@gmail.com',
    phone: '+92 312 9876543',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80',
    city: 'Peshawar',
    address: 'Sector F-4, Phase 6, Hayatabad, Peshawar',
    role: 'investor',
    provider: 'google',
    createdAt: '2026-08-15T14:20:00Z',
    lastLoginAt: '2026-11-11T18:15:00Z',
    savedPropertyIds: ['prop-kalam-cottage-chalet'],
    ownedPropertyIds: ['prop-corner-apartments-kalam'],
    status: 'active',
  },
];

export const userService = {
  getAllUsers(): UserProfile[] {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_REGISTERED_USERS));
        return INITIAL_REGISTERED_USERS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_REGISTERED_USERS;
    }
  },

  getUserById(id: string): UserProfile | null {
    const users = this.getAllUsers();
    return users.find((u) => u.id === id) || null;
  },

  getUserByEmail(email: string): UserProfile | null {
    const cleanEmail = email.toLowerCase().trim();
    const users = this.getAllUsers();
    return users.find((u) => u.email.toLowerCase().trim() === cleanEmail) || null;
  },

  saveUser(user: UserProfile): UserProfile {
    const users = this.getAllUsers();
    const existingIndex = users.findIndex(
      (u) => u.id === user.id || u.email.toLowerCase().trim() === user.email.toLowerCase().trim()
    );

    const now = new Date().toISOString();
    const preparedUser: UserProfile = {
      ...user,
      id: user.id || `usr-${Date.now()}`,
      email: user.email.toLowerCase().trim(),
      city: user.city || 'Peshawar',
      address: user.address || 'Peshawar, Khyber Pakhtunkhwa',
      role: user.role || 'customer',
      status: user.status || 'active',
      savedPropertyIds: user.savedPropertyIds || [],
      ownedPropertyIds: user.ownedPropertyIds || [],
      createdAt: user.createdAt || now,
      lastLoginAt: now,
      updatedAt: now,
    };

    let updatedUsers: UserProfile[];
    if (existingIndex >= 0) {
      updatedUsers = [...users];
      updatedUsers[existingIndex] = {
        ...updatedUsers[existingIndex],
        ...preparedUser,
        savedPropertyIds: preparedUser.savedPropertyIds?.length
          ? preparedUser.savedPropertyIds
          : updatedUsers[existingIndex].savedPropertyIds || [],
        ownedPropertyIds: preparedUser.ownedPropertyIds?.length
          ? preparedUser.ownedPropertyIds
          : updatedUsers[existingIndex].ownedPropertyIds || [],
      };
    } else {
      updatedUsers = [preparedUser, ...users];
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    window.dispatchEvent(new CustomEvent('peshawer_users_updated', { detail: updatedUsers }));
    return existingIndex >= 0 ? updatedUsers[existingIndex] : preparedUser;
  },

  updateUser(id: string, updates: Partial<UserProfile>): UserProfile | null {
    const users = this.getAllUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx < 0) return null;

    const updatedUser: UserProfile = {
      ...users[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    users[idx] = updatedUser;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    window.dispatchEvent(new CustomEvent('peshawer_users_updated', { detail: users }));
    return updatedUser;
  },

  deleteUser(id: string): boolean {
    const users = this.getAllUsers();
    const filtered = users.filter((u) => u.id !== id);
    if (filtered.length === users.length) return false;

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('peshawer_users_updated', { detail: filtered }));
    return true;
  },
};
