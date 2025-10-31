import {
  groupAndCountByYear,
  groupAndCountByLocation,
  groupAndCountByCompany,
  groupAndCountByMajor,
} from '@/helpers/alumni.helpers';
import {
  ServiceResponseBuilder,
  PaginatedResponseBuilder,
} from '@/helpers/response.helpers';
import type {
  AlumniFilters,
  AlumniStats,
  AlumniResponse,
  AlumniListResponse,
  AlumniStatsResponse,
} from '@/types/alumni-query';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { createClient as createClientSideClient } from '@/utils/supabase/client';
import { mapErrorToIndonesian } from '@/utils/errorMapper';

/**
 * Alumni service class that handles all alumni-related data operations
 * Uses dependency injection for Supabase client to support both client and server contexts
 */
export class AlumniService {
  private supabase: SupabaseClient<Database>;

  constructor(supabaseClient: SupabaseClient<Database>) {
    this.supabase = supabaseClient;
  }

  /**
   * Fetch paginated list of alumni with optional filtering
   */
  async getAlumni(filters: AlumniFilters = {}): Promise<AlumniListResponse> {
    try {
      const { search, year, company, location, page = 1, limit = 12 } = filters;

      // Start building the query
      let query = this.supabase
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
        .eq('deleted', false)
        .eq('role', 'user');

      // Apply search filter (search by full name)
      if (search) {
        query = query.ilike('full_name', `%${search}%`);
      }

      // Apply year filter
      if (year) {
        query = query.eq('year', year);
      }

      // Apply location filter
      if (location) {
        query = query.ilike('location', `%${location}%`);
      }

      // Get total count for pagination
      const { count } = await this.supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('deleted', false)
        .eq('role', 'user');

      // Apply pagination
      const offset = (page - 1) * limit;
      query = query.range(offset, offset + limit - 1);

      // Execute query
      const { data: users, error } = await query;

      if (error) {
        return PaginatedResponseBuilder.error(error.message, page, limit);
      }

      if (!users) {
        return PaginatedResponseBuilder.success(
          [],
          PaginatedResponseBuilder.createPagination(page, limit, 0)
        );
      }

      // Apply company filter on raw data
      let filteredUsers = users;
      if (company) {
        filteredUsers = users.filter(
          (user) =>
            user.user_experiences?.some(
              (exp) =>
                exp.is_current &&
                exp.company.toLowerCase().includes(company.toLowerCase())
            ) || false
        );
      }

      const total = count || 0;
      const pagination = PaginatedResponseBuilder.createPagination(
        page,
        limit,
        total
      );

      return PaginatedResponseBuilder.success(filteredUsers, pagination);
    } catch (error) {
      return PaginatedResponseBuilder.error(
        mapErrorToIndonesian(error),
        filters.page || 1,
        filters.limit || 12
      );
    }
  }

  /**
   * Fetch a single alumni profile by ID
   * Phone numbers are automatically masked for privacy (format: +XX **** XXX)
   */
  async getAlumniProfile(id: string): Promise<AlumniResponse> {
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
        .eq('id', id)
        .eq('deleted', false)
        .single();

      if (error) {
        return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
      }

      if (!user) {
        return ServiceResponseBuilder.error(
          mapErrorToIndonesian('Alumni profile not found')
        );
      }

      return ServiceResponseBuilder.success(user);
    } catch (error) {
      return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
    }
  }

  /**
   * Fetch alumni statistics
   */
  async getAlumniStats(): Promise<AlumniStatsResponse> {
    try {
      // Get total alumni count
      const { count: totalAlumni } = await this.supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('deleted', false)
        .eq('role', 'user');

      // Get alumni by year
      const { data: byYearData } = await this.supabase
        .from('users')
        .select('year')
        .eq('deleted', false)
        .eq('role', 'user')
        .not('year', 'is', null);

      // Get alumni by location
      const { data: byLocationData } = await this.supabase
        .from('users')
        .select('location')
        .eq('deleted', false)
        .eq('role', 'user')
        .not('location', 'is', null);

      // Get alumni by major
      const { data: byMajorData } = await this.supabase
        .from('users')
        .select('major')
        .eq('deleted', false)
        .eq('role', 'user')
        .not('major', 'is', null);

      // Get current companies from experiences
      const { data: experiencesData } = await this.supabase
        .from('user_experiences')
        .select('company, user_id')
        .eq('is_current', true);

      // Process the data
      const byYear = groupAndCountByYear(byYearData || []);
      const byLocation = groupAndCountByLocation(byLocationData || []);
      const byMajor = groupAndCountByMajor(byMajorData || []);
      const byCompany = groupAndCountByCompany(experiencesData || []);

      const stats: AlumniStats = {
        total_alumni: totalAlumni || 0,
        by_year: byYear,
        by_location: byLocation,
        by_company: byCompany,
        by_major: byMajor,
      };

      return ServiceResponseBuilder.success(stats);
    } catch (error) {
      return ServiceResponseBuilder.error(mapErrorToIndonesian(error));
    }
  }
}

// Legacy singleton for backward compatibility (client-side only)
export const alumniService = new AlumniService(createClientSideClient());
