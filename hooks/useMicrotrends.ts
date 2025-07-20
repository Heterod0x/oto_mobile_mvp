import { useEffect, useState } from 'react';
import { fetchMicrotrends } from '@/services/api';
import { MicrotrendListResponse } from '@/types/trend';

export default function useMicrotrends() {
  const [data, setData] = useState<MicrotrendListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchMicrotrends();
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
