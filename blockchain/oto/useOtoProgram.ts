import * as anchor from "@coral-xyz/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
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
      commitment: "finalized",
    });
  }, [connection, anchorWallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    return new anchor.Program(otoIdl as anchor.Idl, PROGRAM_ID, provider);
  }, [provider]);

  // Build an unsigned claim transaction.
  // The returned transaction must be forwarded to the server
  // where the admin signer adds their signature and submits it.
  const buildClaimTx = async (amount: number) => {
    if (!program || !anchorWallet) return null;

    const [otoPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("oto")],
      PROGRAM_ID
    );

    const otoAccount = await program.account.oto.fetch(otoPda);
    const mint = otoAccount.mint as PublicKey;

    const userTokenAccount = await getAssociatedTokenAddress(
      mint,
      anchorWallet.publicKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const ix = await program.methods
      .mintOto(new anchor.BN(amount))
      .accounts({
        oto: otoPda,
        beneficiary: anchorWallet.publicKey,
        payer: ADMIN_PUBLIC_KEY,
        userTokenAccount,
        mint,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    // const { blockhash } = await connection.getLatestBlockhash();
    const { blockhash } = await connection.getLatestBlockhash("finalized");
    return new Transaction({
      feePayer: ADMIN_PUBLIC_KEY,
      recentBlockhash: blockhash,
    }).add(ix);
  };

  const signTransaction = async (tx: Transaction) => {
    if (!anchorWallet) return null;
    return anchorWallet.signTransaction(tx);
  };

  return { program, buildClaimTx, signTransaction };
};
