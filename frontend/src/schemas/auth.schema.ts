import { z } from 'zod';
import type { Database } from '@/types/database';
import type { User, Session } from '@supabase/supabase-js';

/**
 * Authentication schemas using Zod for validation
 * Provides type-safe validation for auth-related data
 */

// Sign up schema
export const signUpSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password must be less than 128 characters'),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  nim: z
    .string()
    .min(1, 'NIM is required')
    .min(6, 'NIM must be at least 6 characters')
    .max(20, 'NIM must be less than 20 characters')
    .regex(/^[0-9]+$/, 'NIM can only contain numbers'),
});

// Sign in schema
export const signInSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Password reset schema
export const passwordResetSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

// Profile update schema
export const profileUpdateSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces')
    .optional(),
  nim: z
    .string()
    .min(6, 'NIM must be at least 6 characters')
    .max(20, 'NIM must be less than 20 characters')
    .regex(/^[0-9]+$/, 'NIM can only contain numbers')
    .optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z
    .string()
    .max(100, 'Location must be less than 100 characters')
    .optional(),
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .optional(),
  year: z
    .number()
    .int('Year must be a whole number')
    .min(1990, 'Year must be 1990 or later')
    .max(
      new Date().getFullYear(),
      `Year cannot be later than ${new Date().getFullYear()}`
    )
    .optional(),
  major: z
    .enum(['Teknik Elektro', 'Pendidikan Teknik Elektro'] as const)
    .optional(),
  degree: z.enum(['S1', 'D3'] as const).optional(),
});

// Change password schema
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters long')
      .max(128, 'New password must be less than 128 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Type exports
export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type PasswordResetData = z.infer<typeof passwordResetSchema>;
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;

// Auth response types
export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: string | null;
}

export interface ProfileResponse {
  profile: Database['public']['Tables']['users']['Row'] | null;
  error: string | null;
}

export interface ErrorResponse {
  error: string | null;
}

// Validation helper functions
export const validateSignUp = (data: unknown) => {
  return signUpSchema.safeParse(data);
};

export const validateSignIn = (data: unknown) => {
  return signInSchema.safeParse(data);
};

export const validatePasswordReset = (data: unknown) => {
  return passwordResetSchema.safeParse(data);
};

export const validateProfileUpdate = (data: unknown) => {
  return profileUpdateSchema.safeParse(data);
};

export const validateChangePassword = (data: unknown) => {
  return changePasswordSchema.safeParse(data);
};
