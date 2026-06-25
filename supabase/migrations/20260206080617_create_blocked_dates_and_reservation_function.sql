/*
  # Create booking availability lock system

  1. New Tables
    - `blocked_dates`
      - `id` (uuid, primary key)
      - `blocked_date` (date, not null) - the specific blocked date
      - `booking_id` (text, not null) - reference to the booking
      - `status` (text, default 'reserved') - 'reserved' or 'cancelled'
      - `created_at` (timestamptz, default now())

  2. Indexes
    - Unique partial index on (blocked_date) WHERE status = 'reserved'
      This is the core race condition protection: only one active reservation
      can exist per calendar date at the database level.
    - Composite index on (blocked_date, status) for fast range queries

  3. Functions
    - `attempt_reservation` - atomic PL/pgSQL function that inserts the booking
      AND blocks all dates in a single implicit transaction. If any date is
      already reserved, the UNIQUE constraint raises an exception which rolls
      back the entire operation (booking + all dates). This guarantees
      first-come-first-served behavior even under concurrent requests.

  4. Security
    - RLS enabled on blocked_dates
    - Anonymous SELECT for reserved dates only (calendar display)
    - No direct INSERT/UPDATE/DELETE for anon (writes via SECURITY DEFINER function)

  5. Real-time
    - blocked_dates added to supabase_realtime publication for live calendar sync
*/

CREATE TABLE IF NOT EXISTS blocked_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date date NOT NULL,
  booking_id text NOT NULL,
  status text NOT NULL DEFAULT 'reserved',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_blocked_dates_unique_reserved
  ON blocked_dates (blocked_date)
  WHERE status = 'reserved';

CREATE INDEX IF NOT EXISTS idx_blocked_dates_date_status
  ON blocked_dates (blocked_date, status);

ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reserved dates"
  ON blocked_dates
  FOR SELECT
  TO anon
  USING (status = 'reserved');

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
AS $$
DECLARE
  v_date date;
BEGIN
  INSERT INTO bookings (
    check_in, check_out, nights, adults, children, has_pet,
    payment_method, guest_name, guest_phone, guest_email,
    message, booking_id, webhook_status, status
  )
  VALUES (
    p_check_in, p_check_out, p_nights, p_adults, p_children, p_has_pet,
    p_payment_method, p_guest_name, p_guest_phone, p_guest_email,
    p_message, p_booking_id, 'pending', 'pending'
  );

  v_date := p_check_in;
  WHILE v_date <= p_check_out LOOP
    INSERT INTO blocked_dates (blocked_date, booking_id, status)
    VALUES (v_date, p_booking_id, 'reserved');
    v_date := v_date + 1;
  END LOOP;

  RETURN jsonb_build_object(
    'success', true,
    'booking_id', p_booking_id
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

GRANT EXECUTE ON FUNCTION attempt_reservation(date, date, integer, integer, integer, boolean, text, text, text, text, text, text) TO anon;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
    AND tablename = 'blocked_dates'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE blocked_dates;
  END IF;
END $$;