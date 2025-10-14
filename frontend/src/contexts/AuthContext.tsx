'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import type { User, Session } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { authService } from '@/services/auth.service';
import type {
  SignUpData,
  SignInData,
  ErrorResponse,
} from '@/schemas/auth.schema';
import { logger } from '@teuas/shared/utils/logger';

interface AuthContextType {
  // State
  user: User | null;
  session: Session | null;
  profile: Database['public']['Tables']['users']['Row'] | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Methods
  signUp: (data: SignUpData) => Promise<ErrorResponse>;
  signIn: (data: SignInData) => Promise<ErrorResponse>;
  signOut: () => Promise<ErrorResponse>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication context provider that manages auth state across the app
 * Handles session persistence, user profile loading, and auth state changes
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<
    Database['public']['Tables']['users']['Row'] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!session;

  /**
   * Load user profile from database
   */
  const loadUserProfile = async (userId: string) => {
    try {
      const { profile: userProfile, error } =
        await authService.getUserProfile(userId);
      if (error) {
        logger.error('Error loading user profile:', error);
        return;
      }
      setProfile(userProfile);
    } catch (error) {
      logger.error('Error loading user profile:', error);
    }
  };

  /**
   * Refresh user profile data
   */
  const refreshProfile = async () => {
    if (!user?.id) return;
    await loadUserProfile(user.id);
  };

  /**
   * Handle auth state changes
   */
  const handleAuthStateChange = useCallback(
    async (event: string, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Load user profile when user signs in
        await loadUserProfile(session.user.id);
      } else {
        // Clear profile when user signs out
        setProfile(null);
      }

      setIsLoading(false);
    },
    []
  );

  /**
   * Sign up a new user
   */
  const signUp = async (data: SignUpData): Promise<ErrorResponse> => {
    try {
      setIsLoading(true);
      const { error } = await authService.signUp(data);

      if (error) {
        logger.error('Sign up failed:', error);
        setIsLoading(false);
        return { error };
      }

      // Note: User will be signed in automatically if email confirmation is disabled
      // Otherwise, they need to confirm their email first
      return { error: null };
    } catch (error) {
      logger.error('Sign up error:', error);
      setIsLoading(false);
      return {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      };
    }
  };

  /**
   * Sign in an existing user
   */
  const signIn = async (data: SignInData): Promise<ErrorResponse> => {
    try {
      setIsLoading(true);
      const { error } = await authService.signIn(data);

      if (error) {
        logger.error('Sign in failed:', error);
        setIsLoading(false);
        return { error };
      }

      // Auth state change will be handled by the listener
      return { error: null };
    } catch (error) {
      logger.error('Sign in error:', error);
      setIsLoading(false);
      return {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      };
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async (): Promise<ErrorResponse> => {
    try {
      setIsLoading(true);
      const { error } = await authService.signOut();

      if (error) {
        logger.error('Sign out failed:', error);
        setIsLoading(false);
        return { error };
      }

      // Auth state change will be handled by the listener
      return { error: null };
    } catch (error) {
      logger.error('Sign out error:', error);
      setIsLoading(false);
      return {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      };
    }
  };

  /**
   * Initialize auth state and set up listeners
   */
  useEffect(() => {
    let mounted = true;

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { session: initialSession } =
          await authService.getCurrentSession();

        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);

          if (initialSession?.user) {
            await loadUserProfile(initialSession.user.id);
          }

          setIsLoading(false);
        }
      } catch (error) {
        logger.error('Error initializing auth:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = authService.onAuthStateChange(handleAuthStateChange);

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleAuthStateChange]);

  const value: AuthContextType = {
    // State
    user,
    session,
    profile,
    isLoading,
    isAuthenticated,

    // Methods
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access the auth context
 * Must be used within an AuthProvider
 */
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}
