import type {
  ServiceResponse,
  PaginatedResponse,
  Pagination,
} from '@/types/query';

/**
 * Helper class to create consistent service responses
 */
export class ServiceResponseBuilder {
  /**
   * Create a successful service response
   */
  static success<T>(data: T): ServiceResponse<T> {
    return {
      data,
      error: null,
    };
  }

  /**
   * Create an error service response
   */
  static error<T>(error: string): ServiceResponse<T> {
    return {
      data: null,
      error,
    };
  }
}

/**
 * Helper class to create consistent paginated responses
 */
export class PaginatedResponseBuilder {
  /**
   * Create a successful paginated response
   */
  static success<T>(data: T[], pagination: Pagination): PaginatedResponse<T> {
    return {
      data,
      pagination,
      error: null,
    };
  }

  /**
   * Create an error paginated response
   */
  static error<T>(
    error: string,
    page: number = 1,
    limit: number = 12
  ): PaginatedResponse<T> {
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
      error,
    };
  }

  /**
   * Create pagination metadata
   */
  static createPagination(
    page: number,
    limit: number,
    total: number
  ): Pagination {
    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }
}
