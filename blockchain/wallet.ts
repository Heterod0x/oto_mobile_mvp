import { useCallback, useEffect, useMemo, useState } from 'react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { transact, Web3MobileWallet } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import * as anchor from '@coral-xyz/anchor';

export const APP_IDENTITY = { name: 'OTO Mobile', uri: 'https://example.com' };

export const useMWAWallet = (): anchor.Wallet | null => {
  const [pubkey, setPubkey] = useState<PublicKey | null>(null);

  useEffect(() => {
    (async () => {
      await transact(async (wallet: Web3MobileWallet) => {
        const { accounts } = await wallet.authorize({
          chain: 'solana:devnet',
          identity: APP_IDENTITY,
        });
        setPubkey(new PublicKey(accounts[0].address));
      });
    })();
  }, []);

  const sign = useCallback(
    async (txs: Transaction[] | Transaction) =>
      transact(async (wallet: Web3MobileWallet) => {
        const signed = await wallet.signTransactions({
          transactions: Array.isArray(txs) ? txs : [txs],
        });
        return Array.isArray(txs) ? signed : signed[0];
      }),
    [],
  );

  return useMemo(() => {
    if (!pubkey) return null;
    return {
      publicKey: pubkey,
      signTransaction: (tx: Transaction) => sign(tx) as Promise<Transaction>,
      signAllTransactions: (txs: Transaction[]) => sign(txs) as Promise<Transaction[]>,
    } as anchor.Wallet;
  }, [pubkey, sign]);
};
