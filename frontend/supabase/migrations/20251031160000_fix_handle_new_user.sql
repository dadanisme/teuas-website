-- =============================================
-- Fix Functions with Empty Search Path
-- =============================================
-- Problem: The previous migration broke signup because:
-- 1. nim field is NOT NULL but wasn't being provided in handle_new_user
-- 2. With SET search_path = '', we need fully-qualified function names
--
-- Solution: Update both functions to use pg_catalog qualified functions

-- Fix update_updated_at_column to use pg_catalog.now()
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = pg_catalog.now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fix handle_new_user to include nim and use pg_catalog.coalesce()
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SET search_path = ''
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (id, full_name, nim, email)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    pg_catalog.coalesce(NEW.raw_user_meta_data->>'nim', ''), 
    NEW.email
  );
  RETURN NEW;
END;
$$;

