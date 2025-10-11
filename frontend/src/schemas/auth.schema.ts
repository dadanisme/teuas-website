import { z } from 'zod';
import type { Database } from '@/types/database';
import type { User, Session } from '@supabase/supabase-js';

/**
 * Authentication schemas using Zod for validation
 * Provides type-safe validation for auth-related data
 */

// Sign up schema
export const signUpSchema = z.object({
  email: z.email('Masukkan alamat email yang valid'),
  password: z
    .string()
    .min(8, 'Kata sandi harus minimal 8 karakter')
    .max(128, 'Kata sandi harus kurang dari 128 karakter'),
  fullName: z
    .string()
    .min(1, 'Nama lengkap wajib diisi')
    .min(2, 'Nama lengkap harus minimal 2 karakter')
    .max(100, 'Nama lengkap harus kurang dari 100 karakter')
    .regex(/^[a-zA-Z\s]+$/, 'Nama lengkap hanya boleh berisi huruf dan spasi'),
  nim: z
    .string()
    .min(1, 'NIM wajib diisi')
    .min(6, 'NIM harus minimal 6 karakter')
    .max(20, 'NIM harus kurang dari 20 karakter')
    .regex(/^[0-9]+$/, 'NIM hanya boleh berisi angka'),
});

// Sign up with confirm password schema
export const signUpWithConfirmSchema = signUpSchema
  .extend({
    confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'Anda harus menyetujui syarat dan ketentuan',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi tidak cocok',
    path: ['confirmPassword'],
  });

// Sign in schema
export const signInSchema = z.object({
  email: z.email('Masukkan alamat email yang valid'),
  password: z.string().min(1, 'Kata sandi wajib diisi'),
  rememberMe: z.boolean().optional(),
});

// Password reset schema
export const passwordResetSchema = z.object({
  email: z.email('Masukkan alamat email yang valid'),
});

// Profile update schema
export const profileUpdateSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Nama lengkap harus minimal 2 karakter')
    .max(100, 'Nama lengkap harus kurang dari 100 karakter')
    .regex(/^[a-zA-Z\s]+$/, 'Nama lengkap hanya boleh berisi huruf dan spasi')
    .optional(),
  nim: z
    .string()
    .min(6, 'NIM harus minimal 6 karakter')
    .max(20, 'NIM harus kurang dari 20 karakter')
    .regex(/^[0-9]+$/, 'NIM hanya boleh berisi angka')
    .optional(),
  bio: z.string().max(500, 'Bio harus kurang dari 500 karakter').optional(),
  location: z
    .string()
    .max(100, 'Lokasi harus kurang dari 100 karakter')
    .optional(),
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Masukkan nomor telepon yang valid')
    .optional(),
  year: z
    .number()
    .int('Tahun harus berupa bilangan bulat')
    .min(1990, 'Tahun harus 1990 atau setelahnya')
    .max(
      new Date().getFullYear(),
      `Tahun tidak boleh lebih dari ${new Date().getFullYear()}`
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
    currentPassword: z.string().min(1, 'Kata sandi saat ini wajib diisi'),
    newPassword: z
      .string()
      .min(8, 'Kata sandi baru harus minimal 8 karakter')
      .max(128, 'Kata sandi baru harus kurang dari 128 karakter'),
    confirmPassword: z
      .string()
      .min(1, 'Konfirmasi kata sandi baru wajib diisi'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Kata sandi tidak cocok',
    path: ['confirmPassword'],
  });

// Type exports
export type SignUpData = z.infer<typeof signUpSchema>;
export type SignUpWithConfirmData = z.infer<typeof signUpWithConfirmSchema>;
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
