import { clusterApiUrl, Connection, Commitment } from '@solana/web3.js';
import { useMemo } from 'react';

const CLUSTER: Parameters<typeof clusterApiUrl>[0] = 'devnet';
const COMMITMENT: Commitment = 'processed';

export const useConnection = () =>
  useMemo(() => new Connection(clusterApiUrl(CLUSTER), COMMITMENT), []);
