import { Property } from './index';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  city?: string;
  address?: string;
  role: 'customer' | 'client' | 'investor';
  provider?: 'email' | 'google' | 'github';
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
  savedPropertyIds?: string[];
  ownedPropertyIds?: string[];
  status?: 'active' | 'suspended';
}

export interface UserSession {
  user: UserProfile;
  token?: string;
  expiresAt?: number;
}

export interface UserAppointment {
  id: string;
  userId: string;
  propertyOrProjectTitle: string;
  type: 'Property' | 'Project';
  targetSlug?: string;
  location: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Rescheduled' | 'Completed' | 'Cancelled';
  contactPhone: string;
  message?: string;
  createdAt: string;
}

export interface UserMessage {
  id: string;
  userId: string;
  senderName: string;
  senderRole: 'Agent' | 'User' | 'System';
  avatar?: string;
  propertyTitle?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface UserNotification {
  id: string;
  userId: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'appointment' | 'message' | 'property' | 'system';
  link?: string;
}

export interface UserReview {
  id: string;
  userId: string;
  propertyOrProjectTitle: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Published' | 'Pending Approval';
}

export interface UserPaymentRecord {
  id: string;
  userId: string;
  referenceNumber: string;
  propertyOrProjectTitle: string;
  amountPKR: number;
  date: string;
  status: 'Verified' | 'Pending Clearance' | 'Overdue';
  installmentType: 'Booking' | 'Monthly Installment' | 'Half-Yearly' | 'Possession';
  receiptUrl?: string;
}

