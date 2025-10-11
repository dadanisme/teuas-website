'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import type { Database } from '@/types/database';

/**
 * Custom hook that provides easy access to authentication context
 * Includes helper methods for common auth state checks
 */
export function useAuth() {
  const context = useAuthContext();

  // Helper methods for common auth checks
  const helpers = {
    /**
     * Check if user has a specific role
     */
    hasRole: (role: Database['public']['Enums']['user_role_type']): boolean => {
      return context.profile?.role === role;
    },

    /**
     * Check if user is an admin
     */
    isAdmin: (): boolean => {
      return context.profile?.role === 'admin';
    },

    /**
     * Check if user profile is complete
     */
    isProfileComplete: (): boolean => {
      if (!context.profile) return false;

      const requiredFields = ['full_name', 'nim', 'email'];
      return requiredFields.every(
        (field) =>
          context.profile![field as keyof typeof context.profile] !== null &&
          context.profile![field as keyof typeof context.profile] !== ''
      );
    },

    /**
     * Get user's display name
     */
    getDisplayName: (): string => {
      if (!context.user) return 'Guest';

      // Try to get full name from profile first
      if (context.profile?.full_name) {
        return context.profile.full_name;
      }

      // Fallback to user metadata
      if (context.user.user_metadata?.full_name) {
        return context.user.user_metadata.full_name;
      }

      // Fallback to email
      return context.user.email || 'User';
    },

    /**
     * Get user's initials for avatar
     */
    getInitials: (): string => {
      const displayName = helpers.getDisplayName();

      if (displayName === 'Guest' || displayName === 'User') {
        return 'U';
      }

      const names = displayName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }

      return displayName[0]?.toUpperCase() || 'U';
    },

    /**
     * Check if user email is verified
     */
    isEmailVerified: (): boolean => {
      return context.user?.email_confirmed_at !== null;
    },

    /**
     * Get user's profile photo URL or null
     */
    getPhotoUrl: (): string | null => {
      return context.profile?.photo_url || null;
    },

    /**
     * Check if user has completed their profile setup
     */
    needsProfileSetup: (): boolean => {
      if (!context.profile) return true;

      // Check if essential profile fields are missing
      const essentialFields = ['full_name', 'nim'];
      return essentialFields.some(
        (field) =>
          !context.profile![field as keyof typeof context.profile] ||
          context.profile![field as keyof typeof context.profile] === ''
      );
    },
  };

  return {
    // Core auth state
    ...context,

    // Helper methods
    ...helpers,
  };
}

// Export the type for use in other components
export type UseAuthReturn = ReturnType<typeof useAuth>;
