-- =============================================
-- Fix RLS Policies for Public Access
-- Resolves "permission denied for schema public" in production
-- =============================================

-- Drop existing conflicting policies on users table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.users;
-- Create comprehensive policies for users table
-- Allow public (anonymous) access to non-deleted profiles
CREATE POLICY "Public can view non-deleted profiles" ON public.users
  FOR SELECT USING (deleted = false);
-- Allow authenticated users to view their own profile (including deleted)
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);
-- Keep existing update and insert policies
-- (These should already exist and work correctly)

-- Fix related tables to allow anonymous access to public profiles
-- User Experiences
DROP POLICY IF EXISTS "Public experiences are viewable by everyone" ON public.user_experiences;
CREATE POLICY "Public can view experiences of non-deleted users" ON public.user_experiences
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = user_experiences.user_id 
      AND users.deleted = false
    )
  );
-- User Educations
DROP POLICY IF EXISTS "Public educations are viewable by everyone" ON public.user_educations;
CREATE POLICY "Public can view educations of non-deleted users" ON public.user_educations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = user_educations.user_id 
      AND users.deleted = false
    )
  );
-- User Socials
DROP POLICY IF EXISTS "Public socials are viewable by everyone" ON public.user_socials;
CREATE POLICY "Public can view socials of non-deleted users" ON public.user_socials
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = user_socials.user_id 
      AND users.deleted = false
    )
  );
-- User Skills
DROP POLICY IF EXISTS "Public skills are viewable by everyone" ON public.user_skills;
CREATE POLICY "Public can view skills of non-deleted users" ON public.user_skills
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = user_skills.user_id 
      AND users.deleted = false
    )
  );
-- User Certifications
DROP POLICY IF EXISTS "Public certifications are viewable by everyone" ON public.user_certifications;
CREATE POLICY "Public can view certifications of non-deleted users" ON public.user_certifications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = user_certifications.user_id 
      AND users.deleted = false
    )
  );
-- Add comment for documentation
COMMENT ON POLICY "Public can view non-deleted profiles" ON public.users IS 
'Allows anonymous users to view public alumni profiles for directory functionality';
