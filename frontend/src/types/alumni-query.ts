import type { Database } from './database';
import type { ServiceResponse, PaginatedResponse } from './query';

// Use existing database types
type DbUser = Database['public']['Tables']['users']['Row'];
type DbUserExperience = Database['public']['Tables']['user_experiences']['Row'];
type DbUserSkill = Database['public']['Tables']['user_skills']['Row'];
type DbUserCertification =
  Database['public']['Tables']['user_certifications']['Row'];
type DbUserEducation = Database['public']['Tables']['user_educations']['Row'];
type DbUserSocial = Database['public']['Tables']['user_socials']['Row'];

// Alumni profile with related data - phone is excluded for privacy
export type AlumniProfile = Omit<DbUser, 'phone'> & {
  phone?: string | null; // Optional - excluded from alumni queries for privacy
  user_experiences: DbUserExperience[] | null;
  user_skills: DbUserSkill[] | null;
  user_certifications: DbUserCertification[] | null;
  user_educations: DbUserEducation[] | null;
  user_socials: DbUserSocial[] | null;
};

// Filter parameters for alumni queries
export interface AlumniFilters {
  search?: string;
  year?: number;
  company?: string;
  location?: string;
  page?: number;
  limit?: number;
}

// Alumni statistics
export interface AlumniStats {
  total_alumni: number;
  by_year: Array<{ year: number; count: number }>;
  by_location: Array<{ location: string; count: number }>;
  by_company: Array<{ company: string; count: number }>;
  by_major: Array<{ major: string; count: number }>;
}

// Alumni-specific service response types
export type AlumniResponse = ServiceResponse<AlumniProfile>;
export type AlumniListResponse = PaginatedResponse<AlumniProfile>;
export type AlumniStatsResponse = ServiceResponse<AlumniStats>;

// Statistics grouping helper types
export type YearData = Array<{ year: number | null }>;
export type LocationData = Array<{ location: string | null }>;
export type CompanyData = Array<{ company: string }>;
export type MajorData = Array<{
  major: Database['public']['Enums']['major_type'] | null;
}>;
