/*
  # Fix Auth DB Connection Pool Strategy (Note)

  ## Info
  - The Auth connection pool strategy (percentage-based vs fixed) is a
    project-level setting managed by the Supabase platform
  - It cannot be changed via SQL migrations
  - This must be configured via the Supabase Dashboard:
    Project Settings > Database > Connection Pooling
  - No SQL changes are needed here; this migration documents the required action
*/

SELECT 1;
