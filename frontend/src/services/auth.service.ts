import { createClient } from '@/utils/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import {
  type SignUpData,
  type SignInData,
  type ProfileUpdateData,
  type AuthResponse,
  type ProfileResponse,
  type ErrorResponse,
  validateSignUp,
  validateSignIn,
  validateProfileUpdate,
} from '@/schemas/auth.schema';
import { mapErrorToIndonesian } from '@/utils/errorMapper';

/**
 * Authentication service class that handles all Supabase auth operations
 * Provides a clean interface for authentication methods
 */
export class AuthService {
  private supabase;

  constructor() {
    this.supabase = createClient();
  }

  /**
   * Sign up a new user with email and password
   * Creates user profile automatically via database trigger
   */
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      // Validate input data
      const validation = validateSignUp(data);
      if (!validation.success) {
        return {
          user: null,
          session: null,
          error:
            validation.error.issues[0]?.message ||
            mapErrorToIndonesian('Invalid input data'),
        };
      }

      const validatedData = validation.data;

      const { data: authData, error } = await this.supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          data: {
            full_name: validatedData.fullName,
            nim: validatedData.nim,
          },
        },
      });

      if (error) {
        return {
          user: null,
          session: null,
          error: mapErrorToIndonesian(error),
        };
      }

      return {
        user: authData.user,
        session: authData.session,
        error: null,
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: mapErrorToIndonesian(error),
      };
    }
  }

  /**
   * Sign in an existing user with email and password
   */
  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      // Validate input data
      const validation = validateSignIn(data);
      if (!validation.success) {
        return {
          user: null,
          session: null,
          error:
            validation.error.issues[0]?.message ||
            mapErrorToIndonesian('Invalid input data'),
        };
      }

      const validatedData = validation.data;

      const { data: authData, error } =
        await this.supabase.auth.signInWithPassword({
          email: validatedData.email,
          password: validatedData.password,
        });

      if (error) {
        return {
          user: null,
          session: null,
          error: mapErrorToIndonesian(error),
        };
      }

      return {
        user: authData.user,
        session: authData.session,
        error: null,
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: mapErrorToIndonesian(error),
      };
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<ErrorResponse> {
    try {
      const { error } = await this.supabase.auth.signOut();

      if (error) {
        return { error: mapErrorToIndonesian(error) };
      }

      return { error: null };
    } catch (error) {
      return {
        error: mapErrorToIndonesian(error),
      };
    }
  }

  /**
   * Get the current user session
   */
  async getCurrentSession(): Promise<{
    session: Session | null;
    error: string | null;
  }> {
    try {
      const {
        data: { session },
        error,
      } = await this.supabase.auth.getSession();

      if (error) {
        return { session: null, error: mapErrorToIndonesian(error) };
      }

      return { session, error: null };
    } catch (error) {
      return {
        session: null,
        error: mapErrorToIndonesian(error),
      };
    }
  }

  /**
   * Get the current user
   */
  async getCurrentUser(): Promise<{ user: User | null; error: string | null }> {
    try {
      const {
        data: { user },
        error,
      } = await this.supabase.auth.getUser();

      if (error) {
        return { user: null, error: mapErrorToIndonesian(error) };
      }

      return { user, error: null };
    } catch (error) {
      return {
        user: null,
        error: mapErrorToIndonesian(error),
      };
    }
  }

  /**
   * Update user profile in the users table
   */
  async updateProfile(
    userId: string,
    data: ProfileUpdateData
  ): Promise<ErrorResponse> {
    try {
      // Validate input data
      const validation = validateProfileUpdate(data);
      if (!validation.success) {
        return {
          error:
            validation.error.issues[0]?.message ||
            mapErrorToIndonesian('Invalid input data'),
        };
      }

      const validatedData = validation.data;

      const { error } = await this.supabase
        .from('users')
        .update({
          ...validatedData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        return { error: mapErrorToIndonesian(error) };
      }

      return { error: null };
    } catch (error) {
      return {
        error: mapErrorToIndonesian(error),
      };
    }
  }

  /**
   * Get user profile from the users table
   */
  async getUserProfile(userId: string): Promise<ProfileResponse> {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .eq('deleted', false)
        .single();

      if (error) {
        return { profile: null, error: mapErrorToIndonesian(error) };
      }

      return { profile: data, error: null };
    } catch (error) {
      return {
        profile: null,
        error: mapErrorToIndonesian(error),
      };
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(
    callback: (event: string, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<ErrorResponse> {
    try {
      // Basic email validation
      if (!email || !email.includes('@')) {
        return { error: mapErrorToIndonesian('Invalid email') };
      }

      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { error: mapErrorToIndonesian(error) };
      }

      return { error: null };
    } catch (error) {
      return {
        error: mapErrorToIndonesian(error),
      };
    }
  }
}

// Export a singleton instance
export const authService = new AuthService();
