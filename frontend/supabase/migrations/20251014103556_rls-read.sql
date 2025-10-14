-- =============================================
-- Remove All READ (SELECT) RLS Policies
-- Keep RLS only for write operations (INSERT/UPDATE/DELETE)
-- =============================================

-- Drop all SELECT policies from users table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.users;
DROP POLICY IF EXISTS "Public can view non-deleted profiles" ON public.users;

-- Drop all SELECT policies from user_experiences table
DROP POLICY IF EXISTS "Public experiences are viewable by everyone" ON public.user_experiences;
DROP POLICY IF EXISTS "Public can view experiences of non-deleted users" ON public.user_experiences;

-- Drop all SELECT policies from user_educations table
DROP POLICY IF EXISTS "Public educations are viewable by everyone" ON public.user_educations;
DROP POLICY IF EXISTS "Public can view educations of non-deleted users" ON public.user_educations;

-- Drop all SELECT policies from user_socials table
DROP POLICY IF EXISTS "Public socials are viewable by everyone" ON public.user_socials;
DROP POLICY IF EXISTS "Public can view socials of non-deleted users" ON public.user_socials;

-- Drop all SELECT policies from user_skills table
DROP POLICY IF EXISTS "Public skills are viewable by everyone" ON public.user_skills;
DROP POLICY IF EXISTS "Public can view skills of non-deleted users" ON public.user_skills;

-- Drop all SELECT policies from user_certifications table
DROP POLICY IF EXISTS "Public certifications are viewable by everyone" ON public.user_certifications;
DROP POLICY IF EXISTS "Public can view certifications of non-deleted users" ON public.user_certifications;

-- Keep RLS enabled but allow all SELECT operations
-- This means anyone can read data, but write operations are still protected

-- Add permissive SELECT policies (allow all reads)
CREATE POLICY "Allow all reads" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Allow all reads" ON public.user_experiences
  FOR SELECT USING (true);

CREATE POLICY "Allow all reads" ON public.user_educations
  FOR SELECT USING (true);

CREATE POLICY "Allow all reads" ON public.user_socials
  FOR SELECT USING (true);

CREATE POLICY "Allow all reads" ON public.user_skills
  FOR SELECT USING (true);

CREATE POLICY "Allow all reads" ON public.user_certifications
  FOR SELECT USING (true);

-- Write operations (INSERT/UPDATE/DELETE) remain protected by existing policies:
-- - Users can only modify their own data
-- - Authentication is required for all write operations

-- Add comment for documentation
COMMENT ON POLICY "Allow all reads" ON public.users IS 
'Allows unrestricted read access to all user data. Write operations remain protected by RLS.';
