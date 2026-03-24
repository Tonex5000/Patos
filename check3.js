import {
  PublicKey,
  Keypair,
  Connection,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
  Transaction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import crypto from "crypto";

// ========= CONSTANTS =========
const PROGRAM_ID = new PublicKey("J7GBD93ipPC1U63tPMkqerbTApjZUQKAbCgFhkeo8Vmc");
const PRESALE_AUTHORITY = new PublicKey("8qEfz9ii5AfpamwKJc7pfX5Tmdn6JJ1GHLoXdUhqaFeJ");

const PRESALE_SEED = "PATOS_PRESALE_SEED";
const VAULT_SEED = "PATOS_VAULT_SEED";
const PRESALE_ID = 2;

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// Dummy wallet only for local transaction construction
const dummy = Keypair.generate();
const wallet = {
  publicKey: dummy.publicKey,
  signTransaction: async (tx) => tx,
  signAllTransactions: async (txs) => txs,
};

// ========= HELPERS =========

// Anchor instruction discriminator = first 8 bytes of sha256("global:<instruction_name>")
function anchorDiscriminator(ixNameSnakeCase) {
  return crypto
    .createHash("sha256")
    .update(`global:${ixNameSnakeCase}`)
    .digest()
    .subarray(0, 8);
}

// Build data for withdraw_sol(identifier: u8)
function encodeWithdrawSol(identifier) {
  const discriminator = anchorDiscriminator("withdraw_sol");
  const arg = Buffer.from([identifier]); // u8
  return Buffer.concat([discriminator, arg]);
}

async function main() {
  // ===== Derive PDAs =====
  const [presaleInfo] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(PRESALE_SEED),
      PRESALE_AUTHORITY.toBuffer(),
      Buffer.from([PRESALE_ID]),
    ],
    PROGRAM_ID
  );

  const [vaultInfo] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(VAULT_SEED),
      presaleInfo.toBuffer(),
    ],
    PROGRAM_ID
  );

  console.log("presaleInfo =", presaleInfo.toBase58());
  console.log("vaultInfo   =", vaultInfo.toBase58());

  // ===== Manual instruction encoding =====
  const data = encodeWithdrawSol(PRESALE_ID);

  // ===== Accounts in the exact order shown by your IDL =====
  const keys = [
    { pubkey: presaleInfo, isSigner: false, isWritable: true },
    { pubkey: vaultInfo, isSigner: false, isWritable: true },
    { pubkey: PRESALE_AUTHORITY, isSigner: false, isWritable: false },
    { pubkey: PRESALE_AUTHORITY, isSigner: false, isWritable: true },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ];

  const instruction = new TransactionInstruction({
    programId: PROGRAM_ID,
    keys,
    data,
  });

  console.log("\nInstruction accounts:");
  console.log(
    instruction.keys.map((k) => ({
      pubkey: k.pubkey.toBase58(),
      isSigner: k.isSigner,
      isWritable: k.isWritable,
    }))
  );

  console.log("\nEncoded instruction data (hex):");
  console.log(data.toString("hex"));

  // ===== Build transaction only =====
  const tx = new Transaction().add(instruction);
  tx.feePayer = wallet.publicKey;

  const { blockhash } = await connection.getLatestBlockhash("confirmed");
  tx.recentBlockhash = blockhash;

  console.log("\nTransaction built successfully.");
}

main().catch((err) => {
  console.error("Error:", err);
});