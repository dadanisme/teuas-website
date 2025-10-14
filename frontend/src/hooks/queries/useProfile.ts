import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profile.service';
import { queryKeys } from '@/lib/react-query';
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

// Mutation parameter types
type UpdateBasicProfileParams = {
  userId: string;
  data: Partial<BasicProfileData>;
};

type UpdateExperiencesParams = {
  userId: string;
  experiences: UserExperienceData[];
};

type UpdateSkillsParams = {
  userId: string;
  skills: UserSkillData[];
};

type UpdateCertificationsParams = {
  userId: string;
  certifications: UserCertificationData[];
};

type UpdateEducationsParams = {
  userId: string;
  educations: UserEducationData[];
};

type UpdateSocialsParams = {
  userId: string;
  socials: UserSocialData[];
};

type UpdateCompleteProfileParams = {
  userId: string;
  profileData: {
    basic?: Partial<BasicProfileData>;
    experiences?: UserExperienceData[];
    skills?: UserSkillData[];
    certifications?: UserCertificationData[];
    educations?: UserEducationData[];
    socials?: UserSocialData[];
  };
};

/**
 * Hook to fetch user profile with all related data
 */
export function useProfile(userId: string) {
  return useQuery({
    queryKey: queryKeys.profile.detail(userId),
    queryFn: () => profileService.getProfile(userId),
    select: (response: ProfileResponse) => {
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    },
    // Only fetch if we have a valid user ID
    enabled: !!userId,
    // Cache profile data longer since it changes less frequently
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to update basic profile information
 */
export function useUpdateBasicProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: UpdateBasicProfileParams) =>
      profileService.updateBasicProfile(userId, data),
    onSuccess: (response: ProfileUpdateResponse, { userId }) => {
      if (response.error) {
        throw new Error(response.error);
      }
      // Invalidate profile queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.detail(userId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });
    },
  });
}

/**
 * Hook to update user experiences
 */
export function useUpdateExperiences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, experiences }: UpdateExperiencesParams) =>
      profileService.updateExperiences(userId, experiences),
    onSuccess: (response: ProfileExperiencesResponse, { userId }) => {
      if (response.error) {
        throw new Error(response.error);
      }
      // Invalidate profile queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.detail(userId),
      });
    },
  });
}

/**
 * Hook to update user skills
 */
export function useUpdateSkills() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, skills }: UpdateSkillsParams) =>
      profileService.updateSkills(userId, skills),
    onSuccess: (response: ProfileSkillsResponse, { userId }) => {
      if (response.error) {
        throw new Error(response.error);
      }
      // Invalidate profile queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.detail(userId),
      });
    },
  });
}

/**
 * Hook to update user certifications
 */
export function useUpdateCertifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, certifications }: UpdateCertificationsParams) =>
      profileService.updateCertifications(userId, certifications),
    onSuccess: (response: ProfileCertificationsResponse, { userId }) => {
      if (response.error) {
        throw new Error(response.error);
      }
      // Invalidate profile queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.detail(userId),
      });
    },
  });
}

/**
 * Hook to update user educations
 */
export function useUpdateEducations() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, educations }: UpdateEducationsParams) =>
      profileService.updateEducations(userId, educations),
    onSuccess: (response: ProfileEducationsResponse, { userId }) => {
      if (response.error) {
        throw new Error(response.error);
      }
      // Invalidate profile queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.detail(userId),
      });
    },
  });
}

/**
 * Hook to update user socials
 */
export function useUpdateSocials() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, socials }: UpdateSocialsParams) =>
      profileService.updateSocials(userId, socials),
    onSuccess: (response: ProfileSocialsResponse, { userId }) => {
      if (response.error) {
        throw new Error(response.error);
      }
      // Invalidate profile queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.detail(userId),
      });
    },
  });
}

/**
 * Hook to update complete profile (all sections at once)
 */
export function useUpdateCompleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, profileData }: UpdateCompleteProfileParams) =>
      profileService.updateCompleteProfile(userId, profileData),
    onSuccess: (response: ProfileResponse) => {
      if (response.error) {
        throw new Error(response.error);
      }
      // Invalidate all profile-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });
      // Also invalidate alumni queries since profile updates affect alumni data
      queryClient.invalidateQueries({ queryKey: queryKeys.alumni.all });
    },
  });
}
