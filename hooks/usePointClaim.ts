import { useOtoProgram } from "@/blockchain/oto/useOtoProgram";
import { claimPoints, fetchClaimableAmount } from "@/services/api";
import { ClaimableAmountResponse, ClaimResponse } from "@/types/user";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/oto-auth";

export default function usePointClaim() {
  const { user, getAccessToken } = useAuth();
  const { buildClaimTx, signTransaction } = useOtoProgram();
  const [data, setData] = useState<ClaimableAmountResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (!user) return;
    let canceled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = (await getAccessToken()) || "";
        const res = await fetchClaimableAmount(user.id, token);
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
  }, [getAccessToken, user]);

  const claim = async (): Promise<ClaimResponse | null> => {
    if (!user || !data) return null;
    setClaiming(true);
    setError(null);
    try {
      const token = (await getAccessToken()) || "";

      const tx = await buildClaimTx(data.amount);
      if (!tx) throw new Error("wallet not ready");

      const signed = await signTransaction(tx);
      if (!signed) throw new Error("wallet not ready");

      const serialized = signed
        .serialize({ requireAllSignatures: false, verifySignatures: false })
        .toString("base64");
      const res = await claimPoints(serialized, user.id, token);
      if (!res.success) {
        throw new Error("Claim failed");
      }
      // refresh claimable amount after success
      const refreshed = await fetchClaimableAmount(user.id, token);
      setData(refreshed);
      return res;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      return null;
    } finally {
      setClaiming(false);
    }
  };

  return { data, loading, error, claim, claiming };
}
