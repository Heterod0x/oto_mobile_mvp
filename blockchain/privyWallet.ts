import { useEffect, useMemo } from "react";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useEmbeddedSolanaWallet, isNotCreated } from "@privy-io/expo";

export const usePrivyWallet = (): anchor.Wallet | null => {
  const sol = useEmbeddedSolanaWallet();

  useEffect(() => {
    if (sol && isNotCreated(sol)) {
      sol.create().catch(() => {});
    }
  }, [sol]);

  return useMemo(() => {
    const wallet = sol?.wallets?.[0];
    if (!wallet) return null;
    const publicKey = new PublicKey(wallet.address);
    const sign = async (tx: Transaction) => {
      const provider = await wallet.getProvider();
      const { signedTransaction } = await provider.request({
        method: "signTransaction",
        params: { transaction: tx },
      });
      return signedTransaction as Transaction;
    };
    return {
      publicKey,
      signTransaction: sign,
      signAllTransactions: async (txs: Transaction[]) =>
        Promise.all(txs.map(sign)),
    } as anchor.Wallet;
  }, [sol]);
};
