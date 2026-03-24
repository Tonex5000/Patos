#!/usr/bin/env node
import * as anchor from "@project-serum/anchor";
import { PublicKey, Connection, Keypair, SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";
import bs58 from "bs58";
import { ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";

const TOKEN_PROGRAM_ID = anchor.utils.token.TOKEN_PROGRAM_ID;
const PRESALE_SEED = "PATOS_PRESALE_SEED";
const VAULT_SEED = "PATOS_VAULT_SEED";

const DEFAULT_PROGRAM_ID = "J7GBD93ipPC1U63tPMkqerbTApjZUQKAbCgFhkeo8Vmc";
const DEFAULT_PRESALE_AUTHORITY = "8qEfz9ii5AfpamwKJc7pfX5Tmdn6JJ1GHLoXdUhqaFeJ";
const DEFAULT_IDENTIFIER = 2;

const IDL = {
  version: "0.1.0",
  name: "token_presale",
  instructions: [
    {
      name: "withdrawSol",
      accounts: [
        { name: "presaleInfo", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "presaleAuthority", isMut: false, isSigner: false },
        { name: "buyer", isMut: true, isSigner: true },
        { name: "rent", isMut: false, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "associatedTokenProgram", isMut: false, isSigner: false }
      ],
      args: [{ name: "identifier", type: "u8" }]
    }
  ]
};

function parsePrivateKey(value) {
  if (!value) {
    throw new Error("Missing PRIVATE_KEY env var. Use base58 secret key or JSON array format.");
  }

  const trimmed = value.trim();
  if (trimmed.startsWith("[")) {
    const key = Uint8Array.from(JSON.parse(trimmed));
    return Keypair.fromSecretKey(key);
  }

  return Keypair.fromSecretKey(bs58.decode(trimmed));
}

async function main() {
  const rpcUrl = process.env.RPC_URL ?? "https://api.mainnet-beta.solana.com";
  const identifier = Number(process.env.PRESALE_ID ?? DEFAULT_IDENTIFIER);
  const programId = new PublicKey(process.env.PROGRAM_ID ?? DEFAULT_PROGRAM_ID);
  const presaleAuthority = new PublicKey(process.env.PRESALE_AUTHORITY ?? DEFAULT_PRESALE_AUTHORITY);
  const payer = parsePrivateKey(process.env.PRIVATE_KEY);

  const connection = new Connection(rpcUrl, "confirmed");
  const wallet = new anchor.Wallet(payer);
  const provider = new anchor.AnchorProvider(connection, wallet, {
    commitment: "confirmed",
    preflightCommitment: "confirmed"
  });

  const program = new anchor.Program(IDL, programId, provider);

  const [presaleInfo] = PublicKey.findProgramAddressSync(
    [Buffer.from(PRESALE_SEED), presaleAuthority.toBuffer(), Uint8Array.from([identifier])],
    programId
  );

  const [vault] = PublicKey.findProgramAddressSync(
    [Buffer.from(VAULT_SEED), presaleInfo.toBuffer()],
    programId
  );

  console.log("RPC_URL:", rpcUrl);
  console.log("Program ID:", programId.toBase58());
  console.log("Signer:", payer.publicKey.toBase58());
  console.log("Presale Authority:", presaleAuthority.toBase58());
  console.log("PRESALE_ID:", identifier);
  console.log("presaleInfo PDA:", presaleInfo.toBase58());
  console.log("vault PDA:", vault.toBase58());

  const signature = await program.methods
    .withdrawSol(identifier)
    .accounts({
      presaleInfo,
      vault,
      presaleAuthority,
      buyer: payer.publicKey,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
    })
    .rpc();

  console.log("Withdraw signature:", signature);
  console.log(`Explorer: https://solscan.io/tx/${signature}`);
}

main().catch((error) => {
  console.error("Withdraw failed:", error);
  process.exit(1);
});
