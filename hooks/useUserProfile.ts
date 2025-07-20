import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/expo';
import { fetchUser, updateUser } from '@/services/api';
import { UserProfileResponse, UserUpdateRequest } from '@/types/user';

export default function useUserProfile() {
  const { user, getAccessToken } = usePrivy();
  const [data, setData] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const token = (await getAccessToken()) || '';
      const res = await fetchUser(user.id, token);
      setData(res);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const save = async (update: UserUpdateRequest) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const token = (await getAccessToken()) || '';
      const res = await updateUser(user.id, token, update);
      setData(res);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return { data, loading, error, reload: load, save };
}
