import { ServiceResponseBuilder } from '@/helpers/response.helpers';
import type {
  ProfileResponse,
  ProfileUpdateResponse,
  ProfileExperiencesResponse,
  ProfileSkillsResponse,
  ProfileCertificationsResponse,
  ProfileEducationsResponse,
  ProfileSocialsResponse,
} from '@/types/profile-query';
import type {
  BasicProfileData,
  UserExperienceData,
  UserSkillData,
  UserCertificationData,
  UserEducationData,
  UserSocialData,
} from '@/schemas/profile.schema';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { createClient as createClientSideClient } from '@/utils/supabase/client';
import { mapErrorToIndonesian } from '@/utils/errorMapper';

/**
 * Profile service class that handles all profile-related data operations
 * Uses dependency injection for Supabase client to support both client and server contexts
 */
export class ProfileService {
  private supabase: SupabaseClient<Database>;

  constructor(supabaseClient: SupabaseClient<Database>) {
    this.supabase = supabaseClient;
  }

  /**
   * Fetch user profile with all related data
   */
  async getProfile(userId: string): Promise<ProfileResponse> {
    try {
      const { data: user, error } = await this.supabase
        .from('users')
        .select(
          `
          *,
          user_experiences(*),
          user_skills(*),
          user_certifications(*),
          user_educations(*),
          user_socials(*)
        `
        )
        .eq('id', userId)
        .eq('deleted', false)
        .single();

      if (error) {
        return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
      }

      if (!user) {
        return ServiceResponseBuilder.error(
          mapErrorToIndonesian('Profile not found')
        );
      }

      return ServiceResponseBuilder.success(user);
    } catch (error) {
      return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
    }
  }

  /**
   * Update basic profile information (users table)
   */
  async updateBasicProfile(
    userId: string,
    data: Partial<BasicProfileData>
  ): Promise<ProfileUpdateResponse> {
    try {
      const { data: updatedUser, error } = await this.supabase
        .from('users')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
      }

      return ServiceResponseBuilder.success(updatedUser);
    } catch (error) {
      return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
    }
  }

  /**
   * Update user experiences
   */
  async updateExperiences(
    userId: string,
    experiences: UserExperienceData[]
  ): Promise<ProfileExperiencesResponse> {
    try {
      // Delete existing experiences
      await this.supabase
        .from('user_experiences')
        .delete()
        .eq('user_id', userId);

      // Insert new experiences if any
      if (experiences.length > 0) {
        const experiencesToInsert = experiences.map(({ id, ...exp }) => ({
          ...exp,
          user_id: userId,
        }));

        const { data, error } = await this.supabase
          .from('user_experiences')
          .insert(experiencesToInsert)
          .select();

        if (error) {
          return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
        }

        return ServiceResponseBuilder.success(data || []);
      }

      return ServiceResponseBuilder.success([]);
    } catch (error) {
      return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
    }
  }

  /**
   * Update user skills
   */
  async updateSkills(
    userId: string,
    skills: UserSkillData[]
  ): Promise<ProfileSkillsResponse> {
    try {
      // Delete existing skills
      await this.supabase.from('user_skills').delete().eq('user_id', userId);

      // Insert new skills if any
      if (skills.length > 0) {
        const skillsToInsert = skills.map(({ id, ...skill }) => ({
          ...skill,
          user_id: userId,
        }));

        const { data, error } = await this.supabase
          .from('user_skills')
          .insert(skillsToInsert)
          .select();

        if (error) {
          return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
        }

        return ServiceResponseBuilder.success(data || []);
      }

      return ServiceResponseBuilder.success([]);
    } catch (error) {
      return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
    }
  }

  /**
   * Update user certifications
   */
  async updateCertifications(
    userId: string,
    certifications: UserCertificationData[]
  ): Promise<ProfileCertificationsResponse> {
    try {
      // Delete existing certifications
      await this.supabase
        .from('user_certifications')
        .delete()
        .eq('user_id', userId);

      // Insert new certifications if any
      if (certifications.length > 0) {
        const certificationsToInsert = certifications.map(
          ({ id, ...cert }) => ({
            ...cert,
            user_id: userId,
          })
        );

        const { data, error } = await this.supabase
          .from('user_certifications')
          .insert(certificationsToInsert)
          .select();

        if (error) {
          return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
        }

        return ServiceResponseBuilder.success(data || []);
      }

      return ServiceResponseBuilder.success([]);
    } catch (error) {
      return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
    }
  }

  /**
   * Update user educations
   */
  async updateEducations(
    userId: string,
    educations: UserEducationData[]
  ): Promise<ProfileEducationsResponse> {
    try {
      // Delete existing educations
      await this.supabase
        .from('user_educations')
        .delete()
        .eq('user_id', userId);

      // Insert new educations if any
      if (educations.length > 0) {
        const educationsToInsert = educations.map(({ id, ...edu }) => ({
          ...edu,
          user_id: userId,
        }));

        const { data, error } = await this.supabase
          .from('user_educations')
          .insert(educationsToInsert)
          .select();

        if (error) {
          return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
        }

        return ServiceResponseBuilder.success(data || []);
      }

      return ServiceResponseBuilder.success([]);
    } catch (error) {
      return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
    }
  }

  /**
   * Update user socials
   */
  async updateSocials(
    userId: string,
    socials: UserSocialData[]
  ): Promise<ProfileSocialsResponse> {
    try {
      // Delete existing socials
      await this.supabase.from('user_socials').delete().eq('user_id', userId);

      // Insert new socials if any
      if (socials.length > 0) {
        const socialsToInsert = socials.map(({ id, ...social }) => ({
          ...social,
          user_id: userId,
        }));

        const { data, error } = await this.supabase
          .from('user_socials')
          .insert(socialsToInsert)
          .select();

        if (error) {
          return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
        }

        return ServiceResponseBuilder.success(data || []);
      }

      return ServiceResponseBuilder.success([]);
    } catch (error) {
      return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
    }
  }

  /**
   * Update complete profile (all sections at once)
   */
  async updateCompleteProfile(
    userId: string,
    profileData: {
      basic?: Partial<BasicProfileData>;
      experiences?: UserExperienceData[];
      skills?: UserSkillData[];
      certifications?: UserCertificationData[];
      educations?: UserEducationData[];
      socials?: UserSocialData[];
    }
  ): Promise<ProfileResponse> {
    try {
      // Collect all update promises with proper typing
      const updatePromises: Array<
        | Promise<ProfileUpdateResponse>
        | Promise<ProfileExperiencesResponse>
        | Promise<ProfileSkillsResponse>
        | Promise<ProfileCertificationsResponse>
        | Promise<ProfileEducationsResponse>
        | Promise<ProfileSocialsResponse>
      > = [];

      // Add basic profile update if provided
      if (profileData.basic) {
        updatePromises.push(this.updateBasicProfile(userId, profileData.basic));
      }

      // Add related data updates if provided
      if (profileData.experiences) {
        updatePromises.push(
          this.updateExperiences(userId, profileData.experiences)
        );
      }

      if (profileData.skills) {
        updatePromises.push(this.updateSkills(userId, profileData.skills));
      }

      if (profileData.certifications) {
        updatePromises.push(
          this.updateCertifications(userId, profileData.certifications)
        );
      }

      if (profileData.educations) {
        updatePromises.push(
          this.updateEducations(userId, profileData.educations)
        );
      }

      if (profileData.socials) {
        updatePromises.push(this.updateSocials(userId, profileData.socials));
      }

      // Execute all updates in parallel
      if (updatePromises.length > 0) {
        const results = await Promise.all(updatePromises);

        // Check for any errors in the results
        for (const result of results) {
          if (result.error) {
            return ServiceResponseBuilder.error(result.error);
          }
        }
      }

      // Return updated profile
      return this.getProfile(userId);
    } catch (error) {
      return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
    }
  }
}

// Legacy singleton for backward compatibility (client-side only)
export const profileService = new ProfileService(createClientSideClient());
