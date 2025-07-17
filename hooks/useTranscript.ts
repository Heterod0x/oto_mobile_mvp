import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/expo';
import { fetchTranscript } from '@/services/api';
import { TranscriptResponse } from '@/types/analysis';

export default function useTranscript(conversationId: string) {
  const { user, getAccessToken } = usePrivy();
  const [data, setData] = useState<TranscriptResponse | null>(null);
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
        const res = await fetchTranscript(conversationId, user.id, token);
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
  }, [user, conversationId]);

  return { data, loading, error };
}
