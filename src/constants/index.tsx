import { PublicKey } from "@solana/web3.js";

export const devMode = false;

export const PRESALE_PROGRAM_PUBKEY = new PublicKey(
  devMode ? "3pRfgQcdeCh3keQKZYPU4Jny9MmMxh3FawBhpasR7JCA" : "J7GBD93ipPC1U63tPMkqerbTApjZUQKAbCgFhkeo8Vmc"
);

export const TOKEN_PUBKEY = new PublicKey(
  devMode ? "4iCUo5F2u5wnBF5bs3pokU3NfVzJwet1Qk1DMdQF87xK" : "CzQ7zUgoLMsjhNnzwoPcAhQb4Tc3Xs1LiaCaVfatnKEr"
);

export const PRESALE_SEED = "PATOS_PRESALE_SEED";
export const VAULT_SEED = "PATOS_VAULT_SEED";
export const PRESALE_ID = 2;

export const PRESALE_AUTHORITY = new PublicKey(
  "CXcd8wTQbLKMDbcbMbCHsggwngpQfKndFSpUVgzhfFvh"//8qEfz9ii5AfpamwKJc7pfX5Tmdn6JJ1GHLoXdUhqaFeJ"
);

export const TOKEN_PRESALE_HARDCAP = 111111111111; // token
export const PRICE_DECIMAL = 8

export const BUYER_SOFTCAP = 0.2; // sol
export const BUYER_HARDCAP = 50; // sol
export const BUYER_TOKEN_HARDCAP = 50000000; // token

export const TOKEN_DECIMAL = 6;

export const SOL_TOKEN_PUBKEY = new PublicKey("So11111111111111111111111111111111111111112")
export const USDC_TOKEN_PUBKEY = new PublicKey(devMode ? '5rqPeFaSA9J8wCMdMMtuW7cGtcFM4JKfA76z4Hwwe8jE' : 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
export const USDT_TOKEN_PUBKEY = new PublicKey(devMode ? 'DqrCx1d1FMnabtV43FEnDTBX3SvzrJtV7gNuNyTNNDDX' : 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB')

export const SOL_PRICEFEED_ID = new PublicKey('7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE')
export const JUP_PRICEFEED_ID = new PublicKey('g6eRCbboSwK4tSWngn773RCMexr1APQr4uA9bGZBYfo')

export const ROUND_PRICES: number[] =
  [
    0.000139999993,   // round 1
    0.0001499999925,  // round 2
    0.0001699999915,  // round 3
    0.0002039999898,  // round 4
    0.0002099999895,  // round 5
    0.0002159999892,  // round 6
    0.0002239999888,  // round 7
    0.0002279999886,  // round 8
    0.0002319999884,  // round 9
    0.0002359999882   // round 10
  ];

/* *********** EVM *********** */

export const USDT_ADDRESS_ETH = devMode ? "0x7D69BFFB1eA0602d1ECB8d27a3b1E056b623330e" : "0xdAC17F958D2ee523a2206206994597C13D831ec7";
export const USDT_ADDRESS_BSC = devMode ? "0x5cB185Fbd95D3B6116Bb15925dAadC7493Fa5B50" : "0x55d398326f99059fF775485246999027B3197955";

export const USDC_ADDRESS_ETH = devMode ? "0x34Eaf0a80E071addbbb7b67e5E5E1359D7f92467" : "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
export const USDC_ADDRESS_BSC = devMode ? "0x0000000000000000000000000000000000000000" : "0x0000000000000000000000000000000000000000";

export const PRESALE_ADDRESS_ETH = devMode ? "0xf6f1b24a145cf8ca22823cF681887C95EE185290" : "0x3709827B485bF6201f59973CdA2abf3C705C4850";
export const PRESALE_ADDRESS_BSC = devMode ? "0xA2F7214F9127B759593f0DbdBb34fCe98882A832" : "0x3709827B485bF6201f59973CdA2abf3C705C4850";

// ETH/EVM Presale Website URL
export const ETH_PRESALE_URL = "https://eth.patosmemecoin.com";