import { createClient } from '@/utils/supabase/client';
import type {
  AlumniFilters,
  AlumniStats,
  AlumniResponse,
  AlumniListResponse,
  AlumniStatsResponse,
  YearData,
  LocationData,
  CompanyData,
  MajorData,
} from '@/types/alumni-query';

/**
 * Alumni service class that handles all alumni-related data operations
 * Integrates with Supabase to fetch real alumni data
 */
export class AlumniService {
  private supabase;

  constructor() {
    this.supabase = createClient();
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
        return {
          data: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
          error: error.message,
        };
      }

      if (!users) {
        return {
          data: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
          error: null,
        };
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
      const totalPages = Math.ceil(total / limit);

      return {
        data: filteredUsers,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: [],
        pagination: {
          page: filters.page || 1,
          limit: filters.limit || 12,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      };
    }
  }

  /**
   * Fetch a single alumni profile by ID
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
        return {
          data: null,
          error: error.message,
        };
      }

      if (!user) {
        return {
          data: null,
          error: 'Alumni profile not found',
        };
      }

      return {
        data: user,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      };
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
      const byYear = this.groupAndCountByYear(byYearData || []);
      const byLocation = this.groupAndCountByLocation(byLocationData || []);
      const byMajor = this.groupAndCountByMajor(byMajorData || []);
      const byCompany = this.groupAndCountByCompany(experiencesData || []);

      const stats: AlumniStats = {
        total_alumni: totalAlumni || 0,
        by_year: byYear,
        by_location: byLocation,
        by_company: byCompany,
        by_major: byMajor,
      };

      return {
        data: stats,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      };
    }
  }

  /**
   * Helper function to group and count data by year
   */
  private groupAndCountByYear(
    data: YearData
  ): Array<{ year: number; count: number }> {
    const grouped = data.reduce(
      (acc, item) => {
        const value = item.year;
        if (value) {
          acc[value] = (acc[value] || 0) + 1;
        }
        return acc;
      },
      {} as Record<number, number>
    );

    return Object.entries(grouped)
      .map(([key, count]) => ({
        year: parseInt(key),
        count: count as number,
      }))
      .sort((a, b) => (b.count as number) - (a.count as number));
  }

  /**
   * Helper function to group and count data by location
   */
  private groupAndCountByLocation(
    data: LocationData
  ): Array<{ location: string; count: number }> {
    const grouped = data.reduce(
      (acc, item) => {
        const value = item.location;
        if (value) {
          acc[value] = (acc[value] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(grouped)
      .map(([key, count]) => ({
        location: key,
        count: count as number,
      }))
      .sort((a, b) => (b.count as number) - (a.count as number));
  }

  /**
   * Helper function to group and count data by company
   */
  private groupAndCountByCompany(
    data: CompanyData
  ): Array<{ company: string; count: number }> {
    const grouped = data.reduce(
      (acc, item) => {
        const value = item.company;
        if (value) {
          acc[value] = (acc[value] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(grouped)
      .map(([key, count]) => ({
        company: key,
        count: count as number,
      }))
      .sort((a, b) => (b.count as number) - (a.count as number));
  }

  /**
   * Helper function to group and count data by major
   */
  private groupAndCountByMajor(
    data: MajorData
  ): Array<{ major: string; count: number }> {
    const grouped = data.reduce(
      (acc, item) => {
        const value = item.major;
        if (value) {
          acc[value] = (acc[value] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(grouped)
      .map(([key, count]) => ({
        major: key,
        count: count as number,
      }))
      .sort((a, b) => (b.count as number) - (a.count as number));
  }
}

// Export a singleton instance
export const alumniService = new AlumniService();
