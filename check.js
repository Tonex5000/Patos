import { PublicKey } from "@solana/web3.js";

const programId = new PublicKey("J7GBD93ipPC1U63tPMkqerbTApjZUQKAbCgFhkeo8Vmc");
const PRESALE_SEED = "PATOS_PRESALE_SEED";
const VAULT_SEED = "PATOS_VAULT_SEED";
const PRESALE_AUTHORITY = new PublicKey("8qEfz9ii5AfpamwKJc7pfX5Tmdn6JJ1GHLoXdUhqaFeJ");
const PRESALE_ID = 2;

const [presale_info] = PublicKey.findProgramAddressSync(
  [
    Buffer.from(PRESALE_SEED),
    PRESALE_AUTHORITY.toBuffer(),
    Buffer.from([PRESALE_ID]),
  ],
  programId
);

const [vault_info] = PublicKey.findProgramAddressSync(
  [
    Buffer.from(VAULT_SEED),
    presale_info.toBuffer(),
  ],
  programId
);

console.log("presale_info:", presale_info.toBase58());
console.log("vault_info:", vault_info.toBase58());