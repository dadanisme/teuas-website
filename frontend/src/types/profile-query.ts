import type { Database } from './database';
import type { ServiceResponse } from './query';

// Use existing database types
type DbUser = Database['public']['Tables']['users']['Row'];
type DbUserExperience = Database['public']['Tables']['user_experiences']['Row'];
type DbUserSkill = Database['public']['Tables']['user_skills']['Row'];
type DbUserCertification =
  Database['public']['Tables']['user_certifications']['Row'];
type DbUserEducation = Database['public']['Tables']['user_educations']['Row'];
type DbUserSocial = Database['public']['Tables']['user_socials']['Row'];

// Profile with related data - exactly matching Supabase query result
export type ProfileData = DbUser & {
  user_experiences: DbUserExperience[] | null;
  user_skills: DbUserSkill[] | null;
  user_certifications: DbUserCertification[] | null;
  user_educations: DbUserEducation[] | null;
  user_socials: DbUserSocial[] | null;
};

// Profile-specific service response types
export type ProfileResponse = ServiceResponse<ProfileData>;
export type ProfileUpdateResponse = ServiceResponse<DbUser>;

// Individual section update response types
export type ProfileExperiencesResponse = ServiceResponse<DbUserExperience[]>;
export type ProfileSkillsResponse = ServiceResponse<DbUserSkill[]>;
export type ProfileCertificationsResponse = ServiceResponse<
  DbUserCertification[]
>;
export type ProfileEducationsResponse = ServiceResponse<DbUserEducation[]>;
export type ProfileSocialsResponse = ServiceResponse<DbUserSocial[]>;
