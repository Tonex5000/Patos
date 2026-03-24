import { PublicKey } from "@solana/web3.js";

const addr = new PublicKey("DboqiNFH4Zoif4y5kXjTLqZGCiSMY5Hq2fXzG7MfT9bq");
console.log(PublicKey.isOnCurve(addr.toBytes()));