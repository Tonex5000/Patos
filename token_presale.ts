export const IDL = {
  "version": "0.1.0",
  "name": "token_presale",
  "constants": [
    {
      "name": "PRESALE_SEED",
      "type": "bytes",
      "value": "[80, 65, 84, 79, 83, 95, 80, 82, 69, 83, 65, 76, 69, 95, 83, 69, 69, 68]"
    }
  ],
  "instructions": [
    {
      "name": "createPresale",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "solTokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "usdtTokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "usdcTokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "softcapAmount",
          "type": "u64"
        },
        {
          "name": "hardcapAmount",
          "type": "u64"
        },
        {
          "name": "maxTokenAmountPerAddress",
          "type": "u64"
        },
        {
          "name": "minTokenAmountPerAddress",
          "type": "u64"
        },
        {
          "name": "pricePerToken",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "u64"
        },
        {
          "name": "endTime",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatePresale",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "maxTokenAmountPerAddress",
          "type": "u64"
        },
        {
          "name": "roundIndex",
          "type": "u8"
        },
        {
          "name": "pricePerToken",
          "type": "u64"
        },
        {
          "name": "softcapAmount",
          "type": "u64"
        },
        {
          "name": "hardcapAmount",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "u64"
        },
        {
          "name": "endTime",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "depositToken",
      "accounts": [
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "toAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "startPresale",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "startTime",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "buyToken",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "presaleTokenMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceUpdate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAssociatedPresaleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAssociatedPresaleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pythSolAccount",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteAmount",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "buyTokenStable",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositTokenMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleTokenMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAssociatedPresaleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAssociatedPresaleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteAmount",
          "type": "u64"
        },
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawToken",
      "accounts": [
        {
          "name": "presaleTokenMintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawSol",
      "accounts": [
        {
          "name": "presaleInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "identifier",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "PresaleInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "solTokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "usdtTokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "usdcTokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "softcapAmount",
            "type": "u64"
          },
          {
            "name": "hardcapAmount",
            "type": "u64"
          },
          {
            "name": "depositTokenAmount",
            "type": "u64"
          },
          {
            "name": "soldTokenAmount",
            "type": "u64"
          },
          {
            "name": "usdTotal",
            "type": "u64"
          },
          {
            "name": "solAmount",
            "type": "u64"
          },
          {
            "name": "usdtAmount",
            "type": "u64"
          },
          {
            "name": "usdcAmount",
            "type": "u64"
          },
          {
            "name": "solVault",
            "type": "u64"
          },
          {
            "name": "usdtVault",
            "type": "u64"
          },
          {
            "name": "usdcVault",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "maxTokenAmountPerAddress",
            "type": "u64"
          },
          {
            "name": "minTokenAmountPerAddress",
            "type": "u64"
          },
          {
            "name": "roundIndex",
            "type": "u8"
          },
          {
            "name": "pricePerToken",
            "type": "u64"
          },
          {
            "name": "isLive",
            "type": "bool"
          },
          {
            "name": "identifier",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "authorityDev",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "vault",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "Overhardcap",
      "msg": "Over hardcap amount."
    },
    {
      "code": 6002,
      "name": "NotAllowed",
      "msg": "Not allowed"
    },
    {
      "code": 6003,
      "name": "NotAllowedToken",
      "msg": "Not allowed tokens."
    },
    {
      "code": 6004,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6005,
      "name": "AlreadyMarked",
      "msg": "Already marked"
    },
    {
      "code": 6006,
      "name": "PresaleNotStarted",
      "msg": "Presale not started yet"
    },
    {
      "code": 6007,
      "name": "PresaleEnded",
      "msg": "Presale already ended"
    },
    {
      "code": 6008,
      "name": "TokenAmountMismatch",
      "msg": "Token amount mismatch"
    },
    {
      "code": 6009,
      "name": "InsufficientFund",
      "msg": "Insufficient Tokens"
    },
    {
      "code": 6010,
      "name": "PresaleNotEnded",
      "msg": "Presale not ended yet"
    },
    {
      "code": 6011,
      "name": "NotEndedYet",
      "msg": "Presale not ended yet"
    },
    {
      "code": 6012,
      "name": "NotReachedSoftcap",
      "msg": "Presale not reached to softcap yet"
    },
    {
      "code": 6013,
      "name": "InvalidAmount",
      "msg": "Invalid Amount"
    }
  ],
  "metadata": {
    "address": "3pRfgQcdeCh3keQKZYPU4Jny9MmMxh3FawBhpasR7JCA"
  }
}