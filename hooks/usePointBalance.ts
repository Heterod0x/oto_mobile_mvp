import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/expo';
import { fetchPointBalance } from '@/services/api';
import { PointBalanceResponse } from '@/types/user';

export default function usePointBalance() {
  const { user, getAccessToken } = usePrivy();
  const [data, setData] = useState<PointBalanceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let canceled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = (await getAccessToken()) || '';
        const res = await fetchPointBalance(user.id, token);
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
  }, [user]);

  return { data, loading, error };
}
