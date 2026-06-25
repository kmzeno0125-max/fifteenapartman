/*
  # Security Improvements

  1. Index Optimization
    - Drop unused index `idx_blocked_dates_date_status` (redundant with partial unique index)

  2. RLS Policy Clarification
    - Add explicit restrictive policy to `cancellation_log` to document no public access

  3. Function Search Path Security
    - Set explicit `search_path` on all SECURITY DEFINER functions to prevent privilege escalation
    - Functions updated: `attempt_reservation`, `lookup_booking_by_token`, `cancel_booking_dates`

  Note: Auth DB connection strategy should be changed from fixed number to percentage-based
  allocation in Supabase dashboard settings. This cannot be automated via migration.
*/

-- Drop unused index (redundant with partial unique index)
DROP INDEX IF EXISTS idx_blocked_dates_date_status;

-- Add explicit restrictive policy to cancellation_log
-- This table is intentionally locked down - writes only via SECURITY DEFINER functions
CREATE POLICY "No public access to cancellation log"
  ON cancellation_log
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Recreate attempt_reservation with explicit search_path
CREATE OR REPLACE FUNCTION attempt_reservation(
  p_check_in date,
  p_check_out date,
  p_nights integer,
  p_adults integer,
  p_children integer,
  p_has_pet boolean,
  p_payment_method text,
  p_guest_name text,
  p_guest_phone text,
  p_guest_email text,
  p_message text,
  p_booking_id text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_date date;
  v_cancel_token uuid;
BEGIN
  INSERT INTO bookings (
    check_in, check_out, nights, adults, children, has_pet,
    payment_method, guest_name, guest_phone, guest_email,
    message, booking_id, webhook_status, status, cancel_token_expires_at
  )
  VALUES (
    p_check_in, p_check_out, p_nights, p_adults, p_children, p_has_pet,
    p_payment_method, p_guest_name, p_guest_phone, p_guest_email,
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
$$;

-- Recreate lookup_booking_by_token with explicit search_path
CREATE OR REPLACE FUNCTION lookup_booking_by_token(p_token uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_booking record;
  v_dates jsonb;
BEGIN
  SELECT * INTO v_booking
  FROM bookings
  WHERE cancel_token = p_token
  AND status != 'cancelled';

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'not_found');
  END IF;

  IF v_booking.cancel_token_expires_at IS NOT NULL AND v_booking.cancel_token_expires_at < now() THEN
    RETURN jsonb_build_object('success', false, 'error', 'token_expired');
  END IF;

  SELECT jsonb_agg(blocked_date ORDER BY blocked_date) INTO v_dates
  FROM blocked_dates
  WHERE booking_id = v_booking.booking_id
  AND status = 'reserved';

  RETURN jsonb_build_object(
    'success', true,
    'booking', jsonb_build_object(
      'booking_id', v_booking.booking_id,
      'guest_name', v_booking.guest_name,
      'guest_email', v_booking.guest_email,
      'check_in', v_booking.check_in,
      'check_out', v_booking.check_out,
      'nights', v_booking.nights,
      'adults', v_booking.adults,
      'children', v_booking.children,
      'has_pet', v_booking.has_pet,
      'status', v_booking.status,
      'created_at', v_booking.created_at
    ),
    'active_dates', COALESCE(v_dates, '[]'::jsonb)
  );
END;
$$;

-- Recreate cancel_booking_dates with explicit search_path
CREATE OR REPLACE FUNCTION cancel_booking_dates(p_token uuid, p_dates date[])
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_booking record;
  v_date date;
  v_cancelled_count integer := 0;
  v_remaining_count integer;
  v_cancelled_dates date[] := ARRAY[]::date[];
  v_remaining_dates date[];
BEGIN
  SELECT * INTO v_booking
  FROM bookings
  WHERE cancel_token = p_token
  AND status != 'cancelled';

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'not_found');
  END IF;

  IF v_booking.cancel_token_expires_at IS NOT NULL AND v_booking.cancel_token_expires_at < now() THEN
    RETURN jsonb_build_object('success', false, 'error', 'token_expired');
  END IF;

  FOREACH v_date IN ARRAY p_dates LOOP
    UPDATE blocked_dates
    SET status = 'cancelled'
    WHERE booking_id = v_booking.booking_id
    AND blocked_date = v_date
    AND status = 'reserved';

    IF FOUND THEN
      v_cancelled_count := v_cancelled_count + 1;
      v_cancelled_dates := array_append(v_cancelled_dates, v_date);
    END IF;
  END LOOP;

  SELECT count(*), array_agg(blocked_date ORDER BY blocked_date)
  INTO v_remaining_count, v_remaining_dates
  FROM blocked_dates
  WHERE booking_id = v_booking.booking_id
  AND status = 'reserved';

  IF v_remaining_count = 0 THEN
    UPDATE bookings SET status = 'cancelled' WHERE booking_id = v_booking.booking_id;
  ELSIF v_cancelled_count > 0 THEN
    UPDATE bookings
    SET status = 'partially_cancelled',
        check_in = (SELECT min(blocked_date) FROM blocked_dates WHERE booking_id = v_booking.booking_id AND status = 'reserved'),
        check_out = (SELECT max(blocked_date) FROM blocked_dates WHERE booking_id = v_booking.booking_id AND status = 'reserved'),
        nights = v_remaining_count
    WHERE booking_id = v_booking.booking_id;
  END IF;

  IF v_cancelled_count > 0 THEN
    INSERT INTO cancellation_log (booking_id, cancel_token, action, cancelled_dates, remaining_dates)
    VALUES (
      v_booking.booking_id,
      p_token,
      CASE WHEN v_remaining_count = 0 THEN 'full_cancel' ELSE 'partial_cancel' END,
      v_cancelled_dates,
      v_remaining_dates
    );
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'cancelled_count', v_cancelled_count,
    'remaining_count', COALESCE(v_remaining_count, 0),
    'cancelled_dates', to_jsonb(v_cancelled_dates),
    'remaining_dates', to_jsonb(COALESCE(v_remaining_dates, ARRAY[]::date[])),
    'new_status', CASE
      WHEN v_remaining_count = 0 THEN 'cancelled'
      WHEN v_cancelled_count > 0 THEN 'partially_cancelled'
      ELSE v_booking.status
    END
  );
END;
$$;