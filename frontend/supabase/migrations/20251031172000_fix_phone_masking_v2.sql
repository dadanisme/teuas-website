-- Fix phone number masking function (v2)
-- Ultra-simplified version using RIGHT function

CREATE OR REPLACE FUNCTION mask_phone_number(phone_number TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  cleaned TEXT;
  digits_only TEXT;
  has_plus BOOLEAN;
  last_three TEXT;
BEGIN
  -- Return N/A if phone is null or empty
  IF phone_number IS NULL OR phone_number = '' THEN
    RETURN 'N/A';
  END IF;
  
  -- Check if original has +
  has_plus := phone_number LIKE '+%';
  
  -- Remove ALL non-digits (including +)
  digits_only := regexp_replace(phone_number, '[^0-9]', '', 'g');
  
  -- If too short, just return mask
  IF length(digits_only) <= 3 THEN
    RETURN '****';
  END IF;
  
  -- Get last 3 digits
  last_three := RIGHT(digits_only, 3);
  
  -- Build result
  IF has_plus THEN
    -- Determine country code length
    -- Country codes starting with 1 or 7 are usually 1-digit
    -- Most others (62, 44, 86, etc.) are 2-digit
    IF substring(digits_only FROM 1 FOR 1) IN ('1', '7') THEN
      -- 1-digit country code (US, Canada, Russia, Kazakhstan)
      RETURN '+' || substring(digits_only FROM 1 FOR 1) || ' **** ' || last_three;
    ELSE
      -- 2-digit country code (most countries)
      RETURN '+' || substring(digits_only FROM 1 FOR 2) || ' **** ' || last_three;
    END IF;
  ELSE
    -- No country code
    RETURN '**** ' || last_three;
  END IF;
END;
$$;

-- Update comment
COMMENT ON FUNCTION mask_phone_number(TEXT) IS 'Masks phone numbers with fixed mask (****) showing only last 3 digits - v2';

-- Test the function
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
  test1 := mask_phone_number('+628123456789');
  test2 := mask_phone_number('08123456789');
  test3 := mask_phone_number('+62 812 3456 7890');
  test4 := mask_phone_number(NULL);
  test5 := mask_phone_number('');
  test6 := mask_phone_number('123');
  test7 := mask_phone_number('+1234567890');
  
  RAISE NOTICE 'Test 1: +628123456789 -> %', test1;
  RAISE NOTICE 'Test 2: 08123456789 -> %', test2;
  RAISE NOTICE 'Test 3: +62 812 3456 7890 -> %', test3;
  RAISE NOTICE 'Test 4: NULL -> %', test4;
  RAISE NOTICE 'Test 5: empty -> %', test5;
  RAISE NOTICE 'Test 6: 123 -> %', test6;
  RAISE NOTICE 'Test 7: +1234567890 -> %', test7;
  
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
    RAISE EXCEPTION 'Test 4 failed';
  END IF;
  
  IF test5 != 'N/A' THEN
    RAISE EXCEPTION 'Test 5 failed';
  END IF;
  
  IF test6 != '****' THEN
    RAISE EXCEPTION 'Test 6 failed: Expected "****", got "%"', test6;
  END IF;
  
  IF test7 != '+1 **** 890' THEN
    RAISE EXCEPTION 'Test 7 failed: Expected "+1 **** 890", got "%"', test7;
  END IF;
  
  RAISE NOTICE '✅ All tests passed!';
END;
$$;

