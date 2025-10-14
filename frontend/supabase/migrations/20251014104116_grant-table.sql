-- =============================================
-- Grant Table Permissions
-- Proper security model: anon = read-only, authenticated = read/write own data
-- =============================================

-- Grant READ-ONLY permissions to anonymous users
GRANT SELECT ON ALL TABLES IN SCHEMA "public" TO anon;

-- Grant full permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA "public" TO authenticated;

-- Note: DELETE is intentionally omitted - we use soft deletes via 'deleted' flag
-- Note: RLS policies will ensure authenticated users can only modify their own data

-- Add comment for documentation
COMMENT ON SCHEMA public IS 'Anonymous users: read-only access. Authenticated users: read/write own data via RLS';
