import * as anchor from "@project-serum/anchor";
import { PublicKey, Connection } from "@solana/web3.js";
import { IDL } from "./token_presale.ts";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

const PROGRAM_ID = new PublicKey("J7GBD93ipPC1U63tPMkqerbTApjZUQKAbCgFhkeo8Vmc");
const PRESALE_AUTHORITY = new PublicKey("8qEfz9ii5AfpamwKJc7pfX5Tmdn6JJ1GHLoXdUhqaFeJ");
const PRESALE_SEED = "PATOS_PRESALE_SEED";
const PRESALE_ID = 2;

const dummyWallet = {
  publicKey: null,
  signTransaction: async (tx) => tx,
  signAllTransactions: async (txs) => txs,
};

(async () => {
  try {
    const [presale_info] = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode(PRESALE_SEED),
        PRESALE_AUTHORITY.toBuffer(),
        new Uint8Array([PRESALE_ID]),
      ],
      PROGRAM_ID
    );

    console.log("Derived presale PDA:", presale_info.toBase58());

    const provider = new anchor.AnchorProvider(
      connection,
      dummyWallet,
      anchor.AnchorProvider.defaultOptions()
    );

    const program = new anchor.Program(IDL, PROGRAM_ID, provider);

    const info = await program.account.presaleInfo.fetch(presale_info);

    console.log("ON-CHAIN AUTHORITY:", info.authority.toBase58());
    console.log("ON-CHAIN VAULT:", info.vault.toBase58());
    console.log("IDENTIFIER:", info.identifier);
  } catch (err) {
    console.error("ERROR:", err);
  }
})();