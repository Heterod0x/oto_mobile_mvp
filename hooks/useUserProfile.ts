import { useEffect, useState } from "react";
import { fetchUserProfile, updateUserProfile } from "@/services/api";
import { UserProfileResponse, UserUpdateRequest } from "@/types/user";
import { useAuth } from "@/lib/oto-auth";

export default function useUserProfile() {
  const { user, getAccessToken } = useAuth();
  const [data, setData] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const token = (await getAccessToken()) || "";
      const res = await fetchUserProfile(user.id, token);
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
  }, [user]);

  const save = async (update: UserUpdateRequest) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const token = (await getAccessToken()) || "";
      await updateUserProfile(update, user.id, token);
      const refreshed = await fetchUserProfile(user.id, token);
      setData(refreshed);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reload: load, save };
}
