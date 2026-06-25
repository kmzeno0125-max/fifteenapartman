/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key) - unique booking identifier
      - `check_in` (date, not null) - arrival date
      - `check_out` (date, not null) - departure date
      - `nights` (integer, not null) - calculated number of nights
      - `adults` (integer, not null, default 2) - number of adult guests
      - `children` (integer, not null, default 0) - number of children
      - `has_pet` (boolean, not null, default false) - whether a pet is arriving
      - `payment_method` (text, not null, default 'card') - chosen payment method
      - `guest_name` (text, not null) - full name of the guest
      - `guest_phone` (text, not null) - guest phone number
      - `guest_email` (text, not null) - guest email address
      - `message` (text, default '') - optional notes or special requests
      - `status` (text, not null, default 'pending') - booking status
      - `created_at` (timestamptz, default now()) - when the booking was created

  2. Security
    - Enable RLS on `bookings` table
    - Add INSERT policy for anonymous users with field validation
    - No SELECT/UPDATE/DELETE policies for anon role (admin-only via dashboard)

  3. Notes
    - Public visitors can submit bookings without authentication
    - All booking management is done through the Supabase dashboard
    - The INSERT policy validates that all required fields are present and non-empty
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  check_in date NOT NULL,
  check_out date NOT NULL,
  nights integer NOT NULL,
  adults integer NOT NULL DEFAULT 2,
  children integer NOT NULL DEFAULT 0,
  has_pet boolean NOT NULL DEFAULT false,
  payment_method text NOT NULL DEFAULT 'card',
  guest_name text NOT NULL,
  guest_phone text NOT NULL,
  guest_email text NOT NULL,
  message text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public users can submit bookings"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (
    guest_name IS NOT NULL
    AND length(trim(guest_name)) > 0
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