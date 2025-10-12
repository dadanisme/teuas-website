// Common query-related types for React Query implementation

// Pagination metadata
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Paginated response with separate pagination field
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
  error: string | null;
}

// Simple service response types - reusable across all services
export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
}

// Query options type for better type safety - reusable
export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
}
