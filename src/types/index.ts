export type PropertyPurpose = 'Buy' | 'Rent' | 'Lease';

export type PropertyCategory =
  | 'Residential'
  | 'Commercial'
  | 'House'
  | 'Apartment'
  | 'Plot'
  | 'Shop'
  | 'Office'
  | 'Cottage'
  | 'Villa';

export type AreaUnit = 'Marla' | 'Kanal' | 'sq ft' | 'sq m';

export interface Property {
  id: string;
  title: string;
  slug: string;
  purpose: PropertyPurpose;
  category: PropertyCategory;
  pricePKR: number;
  location: string;
  address: string;
  city: string;
  area: number;
  areaUnit: AreaUnit;
  bedrooms?: number;
  bathrooms?: number;
  featured: boolean;
  published: boolean;
  status: 'Available' | 'Sold' | 'Rented' | 'Under Offer';
  featuredImage: string;
  gallery: string[];
  description: string;
  features: string[];
  yearBuilt?: number;
  parkingSpaces?: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApartmentPlan {
  id: string;
  title: string; // e.g. "Studio Apartment", "1-Bedroom Apartment", "2-Bedroom Apartment"
  slug: string;
  sizeSqFt: number;
  totalPricePKR: number;
  bookingAmountPKR: number;
  monthlyInstallmentPKR: number;
  monthlyCount: number;
  monthlyTotalPKR: number;
  halfYearlyInstallmentPKR: number;
  halfYearlyCount: number;
  halfYearlyTotalPKR: number;
  possessionPaymentPKR: number;
  verifiedTotalsMatch: boolean;
  benefits: string[];
  bedrooms: number;
  bathrooms: number;
  floor?: string;
  availableUnits?: number;
  featuredImage: string;
  interiorGallery: string[];
  exteriorGallery: string[];
  floorPlanImage?: string;
  pdfUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  slug: 'glamorous-heights' | 'town-garden' | 'kalam-cottages' | 'corner-apartments-kalam' | string;
  location: string;
  city: string;
  tagline: string;
  description: string;
  coverImage: string;
  heroImage: string;
  renderBuildingImage: string;
  hasVideo: boolean; // Town Garden ONLY
  videoUrl?: string;
  videoPoster?: string;
  videoTitle?: string;
  videoDescription?: string;
  gallery: {
    all: string[];
    exterior: string[];
    interior: string[];
  };
  apartments: ApartmentPlan[];
  amenities: string[];
  status: 'Under Construction' | 'Booking Open' | 'Ready for Possession' | 'Upcoming';
  verifiedApproval?: string;
  featured: boolean;
  published: boolean;
  constructionProgress?: number; // 0-100, provisional display value; administrator must verify
  constructionStatus?: string; // e.g. "Finishing & Interior Works"
  constructionLastUpdated?: string; // e.g. "November 2026"
  constructionProgressPublished?: boolean; // toggle publish or hide progress
  constructionDescription?: string;
  constructionPhotos?: string[];
  progressHistory: ProgressUpdate[];
}

export interface ProgressUpdate {
  id: string;
  date: string; // e.g. "2026-11-01"
  title: string; // e.g. "Roof Slabs & Alpine Facade Completed"
  percentage: number;
  previousPercentage?: number;
  statusLabel?: string;
  description: string;
  photoUrl?: string;
  photos?: string[];
  published?: boolean;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  active: boolean;
  order: number;
}

export interface PageHero {
  pagePath: string; // e.g. "/properties", "/about", "/contact"
  pageName: string;
  title: string;
  subtitle: string;
  image: string;
  overlayOpacity?: number;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  itemType: 'property' | 'project' | 'apartment' | 'payment-plan' | 'general';
  itemTitle: string;
  itemId?: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  message: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Closed' | 'Archived';
  internalNotes?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectName: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  feedback: string;
  projectName: string;
  avatar?: string;
  rating: number;
  date: string;
  approved: boolean;
}

export interface WhatsAppSettings {
  enabled: boolean;
  phoneNumber: string; // "03117000900"
  intlNumber: string; // "923117000900"
  defaultMessage: string;
  showNumberLabel: boolean;
  desktopVisible: boolean;
  mobileVisible: boolean;
  position: 'bottom-left' | 'bottom-right';
  buttonSize: 'medium' | 'large';
}

export interface SiteSettings {
  companyName: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsapp: string;
  whatsappSettings?: WhatsAppSettings;
  email: string;
  officeAddress: string;
  businessHours: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
}

