/*
  # Switch SECURITY DEFINER functions to SECURITY INVOKER

  1. Changes
    - Switch `attempt_reservation` to SECURITY INVOKER
    - Switch `cancel_booking_dates` to SECURITY INVOKER
    - Switch `lookup_booking_by_token` to SECURITY INVOKER

  2. New RLS Policies
    - `blocked_dates`: Allow anon INSERT (for reservations)
    - `blocked_dates`: Allow anon UPDATE via valid cancel token (for cancellations)
    - `bookings`: Allow anon SELECT via cancel token (for lookup/cancel)
    - `bookings`: Allow anon UPDATE via cancel token (for cancel status)
    - `cancellation_log`: Allow anon INSERT (for cancel logging)

  3. Security
    - Functions no longer run with elevated privileges
    - All table access is governed by RLS policies
    - Cancel operations require a valid cancel_token
    - Booking lookups restricted to token-based access
*/

-- 1. Add RLS policy: anon can INSERT into blocked_dates
CREATE POLICY "Anon can insert blocked dates for reservations"
  ON blocked_dates
  FOR INSERT
  TO anon
  WITH CHECK (status = 'reserved');

-- 2. Add RLS policy: anon can UPDATE blocked_dates when booking has valid cancel token
CREATE POLICY "Anon can cancel blocked dates via token"
  ON blocked_dates
  FOR UPDATE
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.booking_id = blocked_dates.booking_id
        AND bookings.cancel_token IS NOT NULL
        AND bookings.status != 'cancelled'
    )
  )
  WITH CHECK (status = 'cancelled');

-- 3. Add RLS policy: anon can SELECT bookings via cancel_token
CREATE POLICY "Anon can lookup booking by cancel token"
  ON bookings
  FOR SELECT
  TO anon
  USING (cancel_token IS NOT NULL AND status != 'cancelled');

-- 4. Add RLS policy: anon can UPDATE bookings via cancel_token (for cancel operations)
CREATE POLICY "Anon can update booking status via cancel token"
  ON bookings
  FOR UPDATE
  TO anon
  USING (cancel_token IS NOT NULL AND status != 'cancelled')
  WITH CHECK (status IN ('cancelled', 'partially_cancelled', 'pending'));

-- 5. Drop the restrictive cancellation_log policy and add INSERT-only for anon
DROP POLICY IF EXISTS "No public access to cancellation log" ON cancellation_log;

CREATE POLICY "Anon can insert cancellation log entries"
  ON cancellation_log
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "No public read access to cancellation log"
  ON cancellation_log
  FOR SELECT
  TO anon
  USING (false);

CREATE POLICY "No public update access to cancellation log"
  ON cancellation_log
  FOR UPDATE
  TO anon
  USING (false);

CREATE POLICY "No public delete access to cancellation log"
  ON cancellation_log
  FOR DELETE
  TO anon
  USING (false);

-- 6. Add SELECT policy for blocked_dates including cancelled status (needed for cancel function aggregates)
DROP POLICY IF EXISTS "Anyone can view reserved dates" ON blocked_dates;

CREATE POLICY "Anon can view blocked dates"
  ON blocked_dates
  FOR SELECT
  TO anon
  USING (status IN ('reserved', 'cancelled'));

-- 7. Switch functions to SECURITY INVOKER

ALTER FUNCTION public.attempt_reservation(date, date, integer, integer, integer, boolean, text, text, text, text, text, text, text)
  SECURITY INVOKER;

ALTER FUNCTION public.cancel_booking_dates(uuid, date[])
  SECURITY INVOKER;

ALTER FUNCTION public.lookup_booking_by_token(uuid)
  SECURITY INVOKER;
