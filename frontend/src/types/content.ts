// Content management types for news, events, and media

import { User } from './index';

// BaseContett interface for shared properties
interface BaseContent {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

interface Organizer {
  name: string;
  email: string;
  phone?: string;
}

// News types
export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  authorId: number;
  author?: User;
  category: NewsCategory;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  slug: string;
}

export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface NewsFilter {
  category?: string;
  tag?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  search?: string;
}

// Event types
export interface Event {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  featuredImage?: string;
  gallery?: string[];
  eventDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  registrationUrl?: string;
  registrationDeadline?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  price?: number;
  currency?: string;
  category: EventCategory;
  tags: string[];
  organizer: Organizer;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isPublic: boolean;
  requiresRegistration: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface EventCategory {
  id: number;
  name: string;
  slug: string;
  color: string;
  icon?: string;
}

export interface EventFilter {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  location?: string;
  status?: string;
  requiresRegistration?: boolean;
  search?: string;
}

export interface EventRegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  organization?: string;
  specialRequests?: string;
}

// Media types
export interface MediaItem {
  id: number;
  title: string;
  description?: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  fileSize: number;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadedBy: number;
  uploader?: User;
  album?: MediaAlbum;
  albumId?: number;
  tags: string[];
  capturedAt?: string;
  uploadedAt: string;
  isPublic: boolean;
  downloadCount: number;
  slug: string;
}

export interface MediaAlbum {
  id: number;
  title: string;
  description?: string;
  coverImage?: string;
  itemCount: number;
  createdBy: number;
  creator?: User;
  isPublic: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface MediaFilter {
  album?: string;
  type?: 'image' | 'video';
  tag?: string;
  uploader?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

// Search result types
export interface SearchResult {
  type: 'news' | 'event' | 'media' | 'alumni';
  id: number;
  title: string;
  excerpt?: string;
  url: string;
  thumbnail?: string;
  date?: string;
}

// Content creation types
export interface CreateNewsData {
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  categoryId: number;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: string;
}

export interface UpdateNewsData extends Partial<CreateNewsData> {
  id?: number;
}

export interface CreateEventData {
  title: string;
  description: string;
  shortDescription: string;
  featuredImage?: string;
  eventDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  registrationUrl?: string;
  registrationDeadline?: string;
  maxAttendees?: number;
  price?: number;
  currency?: string;
  categoryId: number;
  tags: string[];
  organizer: {
    name: string;
    email: string;
    phone?: string;
  };
  isPublic: boolean;
  requiresRegistration: boolean;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id?: number;
}

export interface CreateAlbumData {
  title: string;
  description?: string;
  isPublic: boolean;
  tags: string[];
}

export interface UpdateMediaData {
  title?: string;
  description?: string;
  altText?: string;
  tags?: string[];
  albumId?: number;
}

// Content statistics
export interface ContentStats {
  totalNews: number;
  totalEvents: number;
  totalMedia: number;
  totalViews: number;
  recentActivity: {
    type: 'news' | 'event' | 'media';
    title: string;
    action: 'created' | 'updated' | 'published';
    timestamp: string;
  }[];
}

// Scholarship
export interface Scholarship extends BaseContent {
  scholarshipType: 'full' | 'partial';
  eventDate: string;
  endDate: string;
  registrationUrl: string;
  registrationDeadline: string;
  category: EventCategory;
  organizer: Organizer;
  gallery?: string[];
  tags: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
  requiresRegistration?: boolean;
  requirements?: string[];
}
