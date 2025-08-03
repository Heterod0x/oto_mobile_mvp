import { useEffect, useState } from "react";
import { fetchConversation } from "@/services/api";
import { ConversationDTO } from "@/types/conversation";
import { useAuth } from "@/lib/oto-auth";

export default function useConversation(conversationId: string) {
  const { user, getAccessToken } = useAuth();
  const [data, setData] = useState<ConversationDTO | null>(null);
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
        const res = await fetchConversation(conversationId, user.id, token);
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
