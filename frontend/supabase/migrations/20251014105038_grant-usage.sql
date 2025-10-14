-- =============================================
-- Grant USAGE Permissions
-- Required for schema access and sequence operations
-- =============================================

-- Grant USAGE on schema to both roles
GRANT USAGE ON SCHEMA "public" TO anon;
GRANT USAGE ON SCHEMA "public" TO authenticated;

-- Grant USAGE on all sequences (needed for auto-generated IDs)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA "public" TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA "public" TO authenticated;

-- Grant permissions on future sequences (for any new tables)
ALTER DEFAULT PRIVILEGES IN SCHEMA "public" GRANT USAGE ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA "public" GRANT USAGE ON SEQUENCES TO authenticated;

-- Add comment for documentation
COMMENT ON SCHEMA public IS 'USAGE permissions granted for schema and sequence access';
