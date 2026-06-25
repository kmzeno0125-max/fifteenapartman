/*
  # Fix cancel_token UUID generation

  1. Changes
    - Update `attempt_reservation` function to let database generate UUID automatically
    - Remove manual text-based token generation
    - Restore proper UUID handling using DEFAULT gen_random_uuid()

  2. Function Updates
    - Remove manual v_cancel_token generation logic
    - Use RETURNING clause to retrieve auto-generated UUID from database
    - Cast UUID to text only in the JSONB response

  3. Security
    - No changes to RLS policies
    - Maintains existing security model
*/

-- Drop existing function
DROP FUNCTION IF EXISTS attempt_reservation(date, date, integer, integer, integer, boolean, text, text, text, text, text, text, text);

-- Create updated function with proper UUID handling
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
  v_cancel_token uuid;
BEGIN
  -- Insert booking - let database generate cancel_token via DEFAULT gen_random_uuid()
  INSERT INTO bookings (
    check_in, check_out, nights, adults, children, has_pet,
    payment_method, guest_name, guest_address, guest_phone, guest_email,
    message, booking_id, webhook_status, status, cancel_token_expires_at
  )
  VALUES (
    p_check_in, p_check_out, p_nights, p_adults, p_children, p_has_pet,
    p_payment_method, p_guest_name, p_guest_address, p_guest_phone, p_guest_email,
    p_message, p_booking_id, 'pending', 'pending', p_check_in::timestamptz
  )
  RETURNING cancel_token INTO v_cancel_token;

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
    'cancel_token', v_cancel_token::text
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

-- Grant execute permission
GRANT EXECUTE ON FUNCTION attempt_reservation(date, date, integer, integer, integer, boolean, text, text, text, text, text, text, text) TO anon;
