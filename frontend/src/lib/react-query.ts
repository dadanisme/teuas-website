import { QueryClient } from '@tanstack/react-query';

/**
 * React Query configuration for the TEUAS frontend
 * Configured with default caching behavior and error handling
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes (default as requested)
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // Retry failed requests up to 3 times
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch on window focus for fresh data
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,

      // Network mode configuration
      networkMode: 'online',
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      networkMode: 'online',
    },
  },
});

/**
 * Query keys factory for consistent query key management
 * Helps with cache invalidation and organization
 */
export const queryKeys = {
  // Alumni-related query keys
  alumni: {
    all: ['alumni'] as const,
    lists: () => [...queryKeys.alumni.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.alumni.lists(), filters] as const,
    details: () => [...queryKeys.alumni.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.alumni.details(), id] as const,
    stats: () => [...queryKeys.alumni.all, 'stats'] as const,
  },
  // Profile-related query keys
  profile: {
    all: ['profile'] as const,
    details: () => [...queryKeys.profile.all, 'detail'] as const,
    detail: (userId: string) =>
      [...queryKeys.profile.details(), userId] as const,
  },
  // Auth-related query keys
  auth: {
    all: ['auth'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },
} as const;
