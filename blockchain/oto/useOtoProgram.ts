import * as anchor from "@coral-xyz/anchor";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useMemo } from "react";
import { useConnection } from "../connection";
import { usePrivyWallet } from "../privyWallet";

import otoIdl from "./idl/oto-v028.json";
const PROGRAM_ID = new PublicKey("otoUzj3eLyJXSkB4DmfGR63eHBMQ9tqPHJaGX8ySSsY");

const ADMIN_PUBLIC_KEY = new PublicKey(
  "8T4je6ro8VbfRvhUJqrpYPrce6aVKoFB75EyJ68eTf3o"
);

export const useOtoProgram = () => {
  const connection = useConnection();
  const anchorWallet = usePrivyWallet();

  const provider = useMemo(() => {
    if (!anchorWallet) return null;
    return new anchor.AnchorProvider(connection, anchorWallet, {
      commitment: "processed",
    });
  }, [connection, anchorWallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    return new anchor.Program(otoIdl as anchor.Idl, PROGRAM_ID, provider);
  }, [provider]);

  const buildClaimTx = async (amount: number) => {
    if (!program || !anchorWallet) return null;
    const ix = await program.methods
      .mintOto(new anchor.BN(amount))
      .accounts({
        beneficiary: anchorWallet.publicKey,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        payer: ADMIN_PUBLIC_KEY,
      })
      .instruction();

    const latest = await connection.getLatestBlockhash();
    return new Transaction({ ...latest, feePayer: ADMIN_PUBLIC_KEY }).add(ix);
  };

  const claimAndSend = async (amount: number) => {
    if (!program) return;
    return program.methods
      .mintOto(new anchor.BN(amount))
      .accounts({
        beneficiary: anchorWallet!.publicKey,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        payer: ADMIN_PUBLIC_KEY,
      })
      .rpc();
  };

  return { program, buildClaimTx, claimAndSend };
};
