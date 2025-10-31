-- =============================================
-- Fix RLS Authenticated User Hang Issue
-- =============================================
-- 
-- Problem: Authenticated users experience infinite hangs when querying
-- the database, but anonymous users work fine.
--
-- Root Cause: The "FOR ALL" policies on related tables (user_experiences,
-- user_educations, user_socials, user_skills, user_certifications) include
-- SELECT operations with restrictive USING clauses:
--   USING ((SELECT auth.uid()) = user_id)
--
-- This restricts authenticated users to only see their OWN data, but conflicts
-- with the permissive "Allow all reads" policy (created in 20251014103556)
-- which allows everyone (including authenticated users) to see ALL data.
--
-- When PostgreSQL tries to evaluate BOTH policies for authenticated users
-- on joined queries (e.g., users with user_experiences(*)), it gets stuck
-- trying to resolve the conflict and hangs indefinitely.
--
-- Solution: Split "FOR ALL" policies into separate INSERT and UPDATE policies.
-- This ensures SELECT operations are ONLY handled by the "Allow all reads"
-- policy, preventing conflicts. DELETE is omitted as we use soft deletes.
--
-- =============================================

-- =============================================
-- DROP PROBLEMATIC "FOR ALL" POLICIES
-- =============================================

DROP POLICY IF EXISTS "Users can manage their own experiences" ON public.user_experiences;
DROP POLICY IF EXISTS "Users can manage their own educations" ON public.user_educations;
DROP POLICY IF EXISTS "Users can manage their own socials" ON public.user_socials;
DROP POLICY IF EXISTS "Users can manage their own skills" ON public.user_skills;
DROP POLICY IF EXISTS "Users can manage their own certifications" ON public.user_certifications;

-- =============================================
-- RECREATE AS SEPARATE INSERT/UPDATE POLICIES
-- =============================================

-- User Experiences: INSERT
CREATE POLICY "Users can insert their own experiences" ON public.user_experiences
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User Experiences: UPDATE
CREATE POLICY "Users can update their own experiences" ON public.user_experiences
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User Educations: INSERT
CREATE POLICY "Users can insert their own educations" ON public.user_educations
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User Educations: UPDATE
CREATE POLICY "Users can update their own educations" ON public.user_educations
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User Socials: INSERT
CREATE POLICY "Users can insert their own socials" ON public.user_socials
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User Socials: UPDATE
CREATE POLICY "Users can update their own socials" ON public.user_socials
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User Skills: INSERT
CREATE POLICY "Users can insert their own skills" ON public.user_skills
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User Skills: UPDATE
CREATE POLICY "Users can update their own skills" ON public.user_skills
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User Certifications: INSERT
CREATE POLICY "Users can insert their own certifications" ON public.user_certifications
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User Certifications: UPDATE
CREATE POLICY "Users can update their own certifications" ON public.user_certifications
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- =============================================
-- DOCUMENTATION
-- =============================================

COMMENT ON POLICY "Users can insert their own experiences" ON public.user_experiences IS 
'INSERT-only policy for authenticated users. SELECT is intentionally handled by the "Allow all reads" policy to prevent policy conflicts that cause hangs.';

COMMENT ON POLICY "Users can update their own experiences" ON public.user_experiences IS 
'UPDATE-only policy for authenticated users. SELECT is intentionally handled by the "Allow all reads" policy to prevent policy conflicts that cause hangs.';

COMMENT ON POLICY "Users can insert their own educations" ON public.user_educations IS 
'INSERT-only policy for authenticated users. SELECT is intentionally handled by the "Allow all reads" policy to prevent policy conflicts that cause hangs.';

COMMENT ON POLICY "Users can update their own educations" ON public.user_educations IS 
'UPDATE-only policy for authenticated users. SELECT is intentionally handled by the "Allow all reads" policy to prevent policy conflicts that cause hangs.';

COMMENT ON POLICY "Users can insert their own socials" ON public.user_socials IS 
'INSERT-only policy for authenticated users. SELECT is intentionally handled by the "Allow all reads" policy to prevent policy conflicts that cause hangs.';

COMMENT ON POLICY "Users can update their own socials" ON public.user_socials IS 
'UPDATE-only policy for authenticated users. SELECT is intentionally handled by the "Allow all reads" policy to prevent policy conflicts that cause hangs.';

COMMENT ON POLICY "Users can insert their own skills" ON public.user_skills IS 
'INSERT-only policy for authenticated users. SELECT is intentionally handled by the "Allow all reads" policy to prevent policy conflicts that cause hangs.';

COMMENT ON POLICY "Users can update their own skills" ON public.user_skills IS 
'UPDATE-only policy for authenticated users. SELECT is intentionally handled by the "Allow all reads" policy to prevent policy conflicts that cause hangs.';

COMMENT ON POLICY "Users can insert their own certifications" ON public.user_certifications IS 
'INSERT-only policy for authenticated users. SELECT is intentionally handled by the "Allow all reads" policy to prevent policy conflicts that cause hangs.';

COMMENT ON POLICY "Users can update their own certifications" ON public.user_certifications IS 
'UPDATE-only policy for authenticated users. SELECT is intentionally handled by the "Allow all reads" policy to prevent policy conflicts that cause hangs.';

