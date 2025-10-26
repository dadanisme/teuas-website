-- =============================================
-- Optimize RLS Policies for Performance
-- =============================================
-- 
-- This migration fixes performance issues where auth.uid() is 
-- re-evaluated for each row in query results.
--
-- Key improvements:
-- 1. Wrap auth.uid() in subquery: (SELECT auth.uid())
-- 2. Add TO authenticated to skip checks for anonymous users
-- 3. Add WITH CHECK clauses to prevent privilege escalation
--
-- See: https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select
-- =============================================

-- =============================================
-- DROP EXISTING POLICIES
-- =============================================

-- Users table policies
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;

-- Related tables policies
DROP POLICY IF EXISTS "Users can manage their own experiences" ON public.user_experiences;
DROP POLICY IF EXISTS "Users can manage their own educations" ON public.user_educations;
DROP POLICY IF EXISTS "Users can manage their own socials" ON public.user_socials;
DROP POLICY IF EXISTS "Users can manage their own skills" ON public.user_skills;
DROP POLICY IF EXISTS "Users can manage their own certifications" ON public.user_certifications;

-- Storage policies
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- =============================================
-- RECREATE POLICIES WITH OPTIMIZATIONS
-- =============================================

-- Users table: UPDATE policy
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

-- Users table: INSERT policy
CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = id);

-- User experiences: ALL operations
CREATE POLICY "Users can manage their own experiences" ON public.user_experiences
  FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User educations: ALL operations
CREATE POLICY "Users can manage their own educations" ON public.user_educations
  FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User socials: ALL operations
CREATE POLICY "Users can manage their own socials" ON public.user_socials
  FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User skills: ALL operations
CREATE POLICY "Users can manage their own skills" ON public.user_skills
  FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- User certifications: ALL operations
CREATE POLICY "Users can manage their own certifications" ON public.user_certifications
  FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Storage: Avatar upload (INSERT)
CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
  );

-- Storage: Avatar update (UPDATE)
CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
  )
  WITH CHECK (
    bucket_id = 'avatars'
    AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
  );

-- Storage: Avatar delete (DELETE)
CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
  );

-- =============================================
-- DOCUMENTATION
-- =============================================

COMMENT ON POLICY "Users can update their own profile" ON public.users IS 
'Optimized: Uses (SELECT auth.uid()) to prevent re-evaluation per row. Restricted to authenticated users only.';

COMMENT ON POLICY "Users can insert their own profile" ON public.users IS 
'Optimized: Uses (SELECT auth.uid()) to prevent re-evaluation per row. Restricted to authenticated users only.';

