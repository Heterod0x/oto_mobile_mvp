import { useEffect, useState } from 'react';
import { fetchTrends } from '@/services/api';
import { TrendListResponse } from '@/types/trend';

export default function useTrends() {
  const [data, setData] = useState<TrendListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchTrends();
        if (!canceled) setData(res);
      } catch (err) {
        if (!canceled) {
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg);
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    load();
    return () => {
      canceled = true;
    };
  }, []);

  return { data, loading, error };
}
