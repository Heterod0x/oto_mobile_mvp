import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/expo";
import { fetchConversations } from "@/services/api";
import { ConversationDTO } from "@/types/conversation";

export default function useConversations() {
  const { user, getAccessToken } = usePrivy();
  const [data, setData] = useState<ConversationDTO[] | null>(null);
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
        const conversations = await fetchConversations(user.id, token);
        if (!canceled) setData(conversations);
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
