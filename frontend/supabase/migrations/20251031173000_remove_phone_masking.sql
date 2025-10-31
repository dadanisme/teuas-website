-- Remove phone number masking function
-- This function is no longer needed as masking should be handled in the application layer

-- Drop the function if it exists
DROP FUNCTION IF EXISTS public.mask_phone_number(TEXT);

-- Add comment for migration history
COMMENT ON SCHEMA public IS 'Removed mask_phone_number function - phone masking now handled in application layer';

