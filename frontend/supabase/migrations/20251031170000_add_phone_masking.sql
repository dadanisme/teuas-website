-- Add phone number masking function
-- This function masks phone numbers for privacy with fixed-length mask
-- Format: +CC **** XXX (country code + 4 asterisks + last 3 digits)

CREATE OR REPLACE FUNCTION mask_phone_number(phone_number TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Return N/A if phone is null or empty
  IF phone_number IS NULL OR phone_number = '' THEN
    RETURN 'N/A';
  END IF;
  
  -- Remove all non-digit characters except + at the start
  DECLARE
    cleaned TEXT;
    country_code TEXT := '';
    number_part TEXT;
    visible_end INTEGER := 3;
    fixed_mask TEXT := '****';
  BEGIN
    cleaned := regexp_replace(phone_number, '[^0-9+]', '', 'g');
    
    -- Extract country code if present
    IF cleaned LIKE '+%' THEN
      country_code := substring(cleaned FROM '^\\+[0-9]{1,3}');
      number_part := substring(cleaned FROM length(country_code) + 1);
    ELSE
      number_part := cleaned;
    END IF;
    
    -- Check if number is long enough to show last 3 digits
    IF length(number_part) <= visible_end THEN
      -- Number too short, return fixed mask only
      IF country_code != '' THEN
        RETURN country_code || ' ' || fixed_mask;
      ELSE
        RETURN fixed_mask;
      END IF;
    END IF;
    
    -- Build masked number with fixed-length mask (always 4 asterisks)
    IF country_code != '' THEN
      RETURN country_code || ' ' || 
             fixed_mask || ' ' ||
             substring(number_part FROM length(number_part) - visible_end + 1);
    ELSE
      RETURN fixed_mask || ' ' ||
             substring(number_part FROM length(number_part) - visible_end + 1);
    END IF;
  END;
END;
$$;

-- Add comment
COMMENT ON FUNCTION mask_phone_number(TEXT) IS 'Masks phone numbers with fixed-length mask (****) showing only last 3 digits';

-- Test the function and show outputs for debugging
DO $$
DECLARE
  test1 TEXT;
  test2 TEXT;
  test3 TEXT;
  test4 TEXT;
  test5 TEXT;
  test6 TEXT;
  test7 TEXT;
BEGIN
  -- Run tests and capture outputs
  test1 := mask_phone_number('+628123456789');
  test2 := mask_phone_number('08123456789');
  test3 := mask_phone_number('+62 812 3456 7890');
  test4 := mask_phone_number(NULL);
  test5 := mask_phone_number('');
  test6 := mask_phone_number('123');
  test7 := mask_phone_number('+1234567890');
  
  -- Show results
  RAISE NOTICE 'Test 1: +628123456789 -> %', test1;
  RAISE NOTICE 'Test 2: 08123456789 -> %', test2;
  RAISE NOTICE 'Test 3: +62 812 3456 7890 -> %', test3;
  RAISE NOTICE 'Test 4: NULL -> %', test4;
  RAISE NOTICE 'Test 5: empty -> %', test5;
  RAISE NOTICE 'Test 6: 123 -> %', test6;
  RAISE NOTICE 'Test 7: +1234567890 -> %', test7;
  
  -- Test assertions
  IF test1 != '+62 **** 789' THEN
    RAISE EXCEPTION 'Test 1 failed: Expected "+62 **** 789", got "%"', test1;
  END IF;
  
  IF test2 != '**** 789' THEN
    RAISE EXCEPTION 'Test 2 failed: Expected "**** 789", got "%"', test2;
  END IF;
  
  IF test3 != '+62 **** 890' THEN
    RAISE EXCEPTION 'Test 3 failed: Expected "+62 **** 890", got "%"', test3;
  END IF;
  
  IF test4 != 'N/A' THEN
    RAISE EXCEPTION 'Test 4 failed: Expected "N/A", got "%"', test4;
  END IF;
  
  IF test5 != 'N/A' THEN
    RAISE EXCEPTION 'Test 5 failed: Expected "N/A", got "%"', test5;
  END IF;
  
  IF test6 != '****' THEN
    RAISE EXCEPTION 'Test 6 failed: Expected "****", got "%"', test6;
  END IF;
  
  IF test7 != '+1 **** 890' THEN
    RAISE EXCEPTION 'Test 7 failed: Expected "+1 **** 890", got "%"', test7;
  END IF;
  
  RAISE NOTICE '✓ All mask_phone_number tests passed!';
END;
$$;

