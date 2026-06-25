/*
  # Add booking_id and webhook_status columns

  1. Changes
    - Add `booking_id` column (text, unique) - stores the generated booking reference ID (format: BN-YYYYMMDD-XXX)
    - Add `webhook_status` column (text, default 'pending') - tracks webhook delivery status
    - Add `webhook_sent_at` column (timestamptz, nullable) - when webhook was successfully sent

  2. Notes
    - booking_id is generated client-side before submission
    - webhook_status can be: 'pending', 'sent', 'failed'
    - These columns help track and debug webhook delivery
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'booking_id'
  ) THEN
    ALTER TABLE bookings ADD COLUMN booking_id text UNIQUE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'webhook_status'
  ) THEN
    ALTER TABLE bookings ADD COLUMN webhook_status text NOT NULL DEFAULT 'pending';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'webhook_sent_at'
  ) THEN
    ALTER TABLE bookings ADD COLUMN webhook_sent_at timestamptz;
  END IF;
END $$;