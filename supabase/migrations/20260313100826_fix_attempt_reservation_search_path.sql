/*
  # Fix mutable search_path on attempt_reservation function

  ## Security Fix
  - Sets a fixed `search_path` on the `public.attempt_reservation` function
  - This prevents search_path injection attacks where a malicious user could
    shadow built-in functions by creating objects in schemas that appear
    earlier in the search path
  - The function is recreated with `SET search_path = public` to lock it down
*/

CREATE OR REPLACE FUNCTION public.attempt_reservation(
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
SET search_path = public
AS $function$
DECLARE
  v_date date;
  v_cancel_token uuid;
BEGIN
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
$function$;
