import { z } from 'zod';

/**
 * Profile schemas using Zod for validation
 * Provides type-safe validation for profile-related data
 */

// User experience schema
export const userExperienceSchema = z.object({
  id: z.string().optional(),
  company: z
    .string()
    .min(1, 'Nama perusahaan wajib diisi')
    .max(100, 'Nama perusahaan terlalu panjang'),
  position: z
    .string()
    .min(1, 'Posisi wajib diisi')
    .max(100, 'Posisi terlalu panjang'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  is_current: z.boolean().optional(),
  description: z.string().max(1000, 'Deskripsi terlalu panjang').optional(),
  location: z.string().max(100, 'Lokasi terlalu panjang').optional(),
});

// User skill schema
export const userSkillSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, 'Nama skill wajib diisi')
    .max(50, 'Nama skill terlalu panjang'),
  category: z.string().max(50, 'Kategori terlalu panjang').optional(),
  level: z.enum(['Pemula', 'Menengah', 'Mahir', 'Ahli'] as const).optional(),
});

// User certification schema
export const userCertificationSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, 'Nama sertifikat wajib diisi')
    .max(100, 'Nama sertifikat terlalu panjang'),
  issuer: z
    .string()
    .min(1, 'Penerbit wajib diisi')
    .max(100, 'Penerbit terlalu panjang'),
  issue_date: z.string().optional(),
  expiry_date: z.string().optional(),
  credential_id: z
    .string()
    .max(100, 'ID kredensial terlalu panjang')
    .optional(),
  credential_url: z
    .string()
    .url('URL kredensial tidak valid')
    .optional()
    .or(z.literal('')),
});

// User education schema
export const userEducationSchema = z.object({
  id: z.string().optional(),
  institution: z
    .string()
    .min(1, 'Nama institusi wajib diisi')
    .max(100, 'Nama institusi terlalu panjang'),
  degree: z
    .string()
    .min(1, 'Gelar wajib diisi')
    .max(50, 'Gelar terlalu panjang'),
  field_of_study: z
    .string()
    .max(100, 'Bidang studi terlalu panjang')
    .optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  grade: z.string().max(10, 'Nilai terlalu panjang').optional(),
  description: z.string().max(500, 'Deskripsi terlalu panjang').optional(),
});

// User social schema
export const userSocialSchema = z.object({
  id: z.string().optional(),
  platform: z.enum([
    'linkedin',
    'twitter',
    'instagram',
    'facebook',
    'github',
    'youtube',
    'tiktok',
    'website',
  ] as const),
  url: z.string().url('URL tidak valid'),
  username: z.string().max(50, 'Username terlalu panjang').optional(),
});

// Basic profile update schema (extends the existing one from auth.schema.ts)
export const basicProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Nama lengkap harus minimal 2 karakter')
    .max(100, 'Nama lengkap harus kurang dari 100 karakter')
    .regex(/^[a-zA-Z\s]+$/, 'Nama lengkap hanya boleh berisi huruf dan spasi'),
  nim: z
    .string()
    .min(6, 'NIM harus minimal 6 karakter')
    .max(20, 'NIM harus kurang dari 20 karakter')
    .regex(/^[0-9]+$/, 'NIM hanya boleh berisi angka'),
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

// Complete profile schema
export const completeProfileSchema = z.object({
  // Basic profile info
  ...basicProfileSchema.shape,

  // Related data
  experiences: z.array(userExperienceSchema).optional(),
  skills: z.array(userSkillSchema).optional(),
  certifications: z.array(userCertificationSchema).optional(),
  educations: z.array(userEducationSchema).optional(),
  socials: z.array(userSocialSchema).optional(),
});

// Type exports
export type UserExperienceData = z.infer<typeof userExperienceSchema>;
export type UserSkillData = z.infer<typeof userSkillSchema>;
export type UserCertificationData = z.infer<typeof userCertificationSchema>;
export type UserEducationData = z.infer<typeof userEducationSchema>;
export type UserSocialData = z.infer<typeof userSocialSchema>;
export type BasicProfileData = z.infer<typeof basicProfileSchema>;
export type CompleteProfileData = z.infer<typeof completeProfileSchema>;

// Validation helper functions
export const validateUserExperience = (data: unknown) => {
  return userExperienceSchema.safeParse(data);
};

export const validateUserSkill = (data: unknown) => {
  return userSkillSchema.safeParse(data);
};

export const validateUserCertification = (data: unknown) => {
  return userCertificationSchema.safeParse(data);
};

export const validateUserEducation = (data: unknown) => {
  return userEducationSchema.safeParse(data);
};

export const validateUserSocial = (data: unknown) => {
  return userSocialSchema.safeParse(data);
};

export const validateBasicProfile = (data: unknown) => {
  return basicProfileSchema.safeParse(data);
};

export const validateCompleteProfile = (data: unknown) => {
  return completeProfileSchema.safeParse(data);
};
