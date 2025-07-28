import { clusterApiUrl, Commitment, Connection } from "@solana/web3.js";
import { useMemo } from "react";

const CLUSTER: Parameters<typeof clusterApiUrl>[0] = "devnet";
const COMMITMENT: Commitment = "confirmed";
const RPC_URL = "https://api.devnet.solana.com";

export const useConnection = () =>
  useMemo(
    () => new Connection(RPC_URL || clusterApiUrl(CLUSTER), COMMITMENT),
    []
  );
