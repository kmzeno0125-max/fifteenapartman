import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useBlockedDates() {
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchDates();

    const channel = supabase
      .channel('blocked-dates-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'blocked_dates',
      }, () => {
        fetchDates();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchDates() {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('blocked_dates')
      .select('blocked_date')
      .gte('blocked_date', today);

    if (data) {
      setBlockedDates(new Set(data.map(d => d.blocked_date)));
    }
  }

  return { blockedDates, refetch: fetchDates };
}
