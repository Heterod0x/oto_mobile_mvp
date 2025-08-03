import { useEffect, useState } from "react";
import { fetchPointBalance } from "@/services/api";
import { PointBalanceResponse } from "@/types/user";
import { useAuth } from "@/lib/oto-auth";

export default function usePointBalance() {
  const { user, getAccessToken } = useAuth();
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
        const token = (await getAccessToken()) || "";
        const res = await fetchPointBalance(user.id, token);
        if (res == null) {
          setData({
            id: user.id,
            points: 0,
          });
          return;
        }
        if (!canceled) setData(res);
      } catch (err) {
        console.log("ERR: ", err);
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
