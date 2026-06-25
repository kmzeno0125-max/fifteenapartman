/*
  # Add guest address field to bookings

  1. Changes
    - Add `guest_address` column to `bookings` table
      - Type: text, not null
      - Contains guest's residential address (postal code, city, street, house number)

  2. Function Updates
    - Update `attempt_reservation` function to accept and store guest_address
    - Update function signature and GRANT permissions

  3. Security
    - RLS policies automatically apply to new column
    - Public insert policy updated to validate guest_address is not empty
*/

-- Add guest_address column to bookings table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'guest_address'
  ) THEN
    ALTER TABLE bookings ADD COLUMN guest_address text NOT NULL DEFAULT '';
  END IF;
END $$;

-- Update RLS policy to include guest_address validation
DROP POLICY IF EXISTS "Public users can submit bookings" ON bookings;

CREATE POLICY "Public users can submit bookings"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (
    guest_name IS NOT NULL
    AND length(trim(guest_name)) > 0
    AND guest_address IS NOT NULL
    AND length(trim(guest_address)) > 0
    AND guest_email IS NOT NULL
    AND length(trim(guest_email)) > 0
    AND guest_phone IS NOT NULL
    AND length(trim(guest_phone)) > 0
    AND check_in IS NOT NULL
    AND check_out IS NOT NULL
    AND check_out > check_in
    AND nights > 0
    AND adults > 0
  );

-- Drop old function
DROP FUNCTION IF EXISTS attempt_reservation(date, date, integer, integer, integer, boolean, text, text, text, text, text, text);

-- Create updated function with guest_address parameter
CREATE OR REPLACE FUNCTION attempt_reservation(
  p_check_in date,
  p_check_out date,
  p_nights integer,
  p_adults integer,
  p_children integer,
  p_has_pet boolean,
  p_payment_method text,
  p_guest_name text,
  p_guest_address text,
  p_guest_phone text,
  p_guest_email text,
  p_message text,
  p_booking_id text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_date date;
  v_cancel_token text;
BEGIN
  -- Generate cancel token
  v_cancel_token := encode(gen_random_bytes(32), 'base64');
  v_cancel_token := replace(replace(replace(v_cancel_token, '+', '-'), '/', '_'), '=', '');

  -- Insert booking with all fields including guest_address
  INSERT INTO bookings (
    check_in, check_out, nights, adults, children, has_pet,
    payment_method, guest_name, guest_address, guest_phone, guest_email,
    message, booking_id, webhook_status, status, cancel_token
  )
  VALUES (
    p_check_in, p_check_out, p_nights, p_adults, p_children, p_has_pet,
    p_payment_method, p_guest_name, p_guest_address, p_guest_phone, p_guest_email,
    p_message, p_booking_id, 'pending', 'pending', v_cancel_token
  );

  -- Block all dates in range
  v_date := p_check_in;
  WHILE v_date <= p_check_out LOOP
    INSERT INTO blocked_dates (blocked_date, booking_id, status)
    VALUES (v_date, p_booking_id, 'reserved');
    v_date := v_date + 1;
  END LOOP;

  RETURN jsonb_build_object(
    'success', true,
    'booking_id', p_booking_id,
    'cancel_token', v_cancel_token
  );

EXCEPTION
  WHEN unique_violation THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'dates_unavailable',
      'message', 'A kiválasztott időszak már nem elérhető. Valaki más előbb foglalt.'
    );
END;
$$;

-- Grant execute permission with new signature
GRANT EXECUTE ON FUNCTION attempt_reservation(date, date, integer, integer, integer, boolean, text, text, text, text, text, text, text) TO anon;