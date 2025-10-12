import { useQuery } from '@tanstack/react-query';
import { alumniService } from '@/services/alumni.service';
import { queryKeys } from '@/lib/react-query';
import type {
  AlumniFilters,
  AlumniListResponse,
  AlumniResponse,
  AlumniStatsResponse,
} from '@/types/alumni-query';

/**
 * Hook to fetch paginated list of alumni with optional filtering
 */
export function useAlumniList(filters: AlumniFilters = {}) {
  return useQuery({
    queryKey: queryKeys.alumni.list(filters as Record<string, unknown>),
    queryFn: () => alumniService.getAlumni(filters),
    select: (response: AlumniListResponse) => {
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    },
    // Enable query when we have valid filters
    enabled: true,
    // Refetch when filters change
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to fetch a single alumni profile by ID
 */
export function useAlumniProfile(id: string) {
  return useQuery({
    queryKey: queryKeys.alumni.detail(id),
    queryFn: () => alumniService.getAlumniProfile(id),
    select: (response: AlumniResponse) => {
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    },
    // Only fetch if we have a valid ID
    enabled: !!id,
    // Cache profile data longer since it changes less frequently
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch alumni statistics
 */
export function useAlumniStats() {
  return useQuery({
    queryKey: queryKeys.alumni.stats(),
    queryFn: () => alumniService.getAlumniStats(),
    select: (response: AlumniStatsResponse) => {
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    },
    // Cache stats longer since they change infrequently
    staleTime: 15 * 60 * 1000, // 15 minutes
    // Retry failed requests
    retry: 3,
  });
}

/**
 * Hook to get unique filter options from alumni data
 * This can be used to populate filter dropdowns dynamically
 */
export function useAlumniFilterOptions() {
  const { data: statsResponse } = useAlumniStats();

  if (!statsResponse?.data || statsResponse.error) {
    return {
      years: [],
      locations: [],
      companies: [],
      majors: [],
    };
  }

  const stats = statsResponse.data;

  return {
    years: stats.by_year.map((item) => item.year).sort((a, b) => b - a),
    locations: stats.by_location.map((item) => item.location).sort(),
    companies: stats.by_company.map((item) => item.company).sort(),
    majors: stats.by_major.map((item) => item.major).sort(),
  };
}
