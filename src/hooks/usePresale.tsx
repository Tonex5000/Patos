import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { IDL } from "../idl/token_presale";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  BUYER_TOKEN_HARDCAP,
  PRESALE_AUTHORITY,
  PRESALE_ID,
  PRESALE_PROGRAM_PUBKEY,
  PRESALE_SEED,
  VAULT_SEED,
  PRICE_DECIMAL,
  TOKEN_DECIMAL,
  TOKEN_PRESALE_HARDCAP,
  TOKEN_PUBKEY,
  SOL_TOKEN_PUBKEY,
  USDC_TOKEN_PUBKEY,
  USDT_TOKEN_PUBKEY,
  SOL_PRICEFEED_ID,
  ROUND_PRICES,
} from "../constants";
import { toast } from "react-toastify";
import { SystemProgram, PublicKey, Connection } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { ASSOCIATED_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { config } from "../config";

export default function usePresale() {
  const { publicKey, wallet } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const [transactionPending, setTransactionPending] = useState(false);
  const [_loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [buyAmount, _setBuyAmount] = useState(0);
  const [claimedAmount, _setClaimedAmount] = useState(0);
  const [totalBuyAmount, setTotalBuyAmount] = useState(0);

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(
        IDL as anchor.Idl,
        PRESALE_PROGRAM_PUBKEY,
        provider
      );
    }
    return undefined;
  }, [connection, anchorWallet]);

  useEffect(() => {
    const getPresaleInfo = async () => {
      if (program && !transactionPending) {
        try {
          setLoading(true);
          const [presale_info, _presale_bump] = findProgramAddressSync(
            [
              utf8.encode(PRESALE_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              new Uint8Array([PRESALE_ID]),
            ],
            program.programId
          );

          console.log("eagle presale_info = ", presale_info.toBase58());
          const info = await program.account.presaleInfo.fetch(presale_info);
          console.log(
            "presale_info",
            info.authority.toBase58(),
            presale_info.toBase58(),
            Number(info.bump),
            info.identifier
          );

          setStartTime(Number(info.startTime));
          setEndTime(Number(info.endTime));
          setTotalBuyAmount(info.soldTokenAmount);
        } catch (error) {
          console.error("Error fetching presale info:", error);
          toast.error(
            "Failed to fetch presale information. Please check your connection."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    getPresaleInfo();
  }, [publicKey, program, transactionPending, connection, anchorWallet]);

  useEffect(() => {
    const localConnection = new Connection(
      config.isMainnet ? config.mainNetRpcUrl : config.devNetRpcUrl,
      "confirmed"
    );

    const provider = new anchor.AnchorProvider(
      localConnection,
      // @ts-ignore
      wallet,
      anchor.AnchorProvider.defaultOptions()
    );

    const localProgram = new anchor.Program(
      IDL as anchor.Idl,
      PRESALE_PROGRAM_PUBKEY,
      provider
    );

    const getPresaleInfo = async () => {
      if (localProgram && !transactionPending) {
        try {
          setLoading(true);
          const [presale_info] = findProgramAddressSync(
            [
              utf8.encode(PRESALE_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              new Uint8Array([Number(PRESALE_ID)]),
            ],
            localProgram.programId
          );

          const info = await localProgram.account.presaleInfo.fetch(
            presale_info
          );

          setStartTime(Number(info.startTime));
          setEndTime(Number(info.endTime));
          setTotalBuyAmount(info.soldTokenAmount);
        } catch (error) {
          console.error("Error fetching presale info:", error);
          toast.error(
            "Failed to fetch presale information. Please check your connection."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    getPresaleInfo();
  }, []);

  const getPrice = async (tokenSymbol: string): Promise<number> => {
    try {
      if (tokenSymbol === "USDT" || tokenSymbol === "USDC") return 1;

      try {
        const resp = await fetch(
          "https://api.coinbase.com/v2/prices/SOL-USD/spot"
        );
        if (resp.ok) {
          const r = await resp.json();
          return parseFloat(r.data.amount);
        }
      } catch (error) {
        console.error("Error fetching from Coinbase API:", error);
      }

      try {
        const resp = await fetch(
          "https://api.diadata.org/v1/assetQuotation/Solana/0x0000000000000000000000000000000000000000"
        );
        if (resp.ok) {
          const r = await resp.json();
          return parseFloat(r.Price);
        }
      } catch (error) {
        console.error("Error fetching from DIA API:", error);
      }

      return 0;
    } catch (error) {
      console.error("Error in getPrice:", error);
      return 0;
    }
  };

  const createPresale = async (): Promise<boolean> => {
    if (!(program && publicKey)) {
      toast.error("Wallet not connected.");
      return false;
    }

    try {
      setTransactionPending(true);

      const [presale_info, _presale_bump] = findProgramAddressSync(
        [
          utf8.encode(PRESALE_SEED),
          PRESALE_AUTHORITY.toBuffer(),
          new Uint8Array([PRESALE_ID]),
        ],
        program.programId
      );

      const [vault_info, _vault_bump] = findProgramAddressSync(
        [utf8.encode(VAULT_SEED), presale_info.toBuffer()],
        program.programId
      );

      console.log("eagle presale_info = ", presale_info.toBase58());

      const bigIntHardcap =
        BigInt(TOKEN_PRESALE_HARDCAP) * BigInt(10 ** TOKEN_DECIMAL);
      const bigIntBuyerHardcap =
        BigInt(BUYER_TOKEN_HARDCAP) * BigInt(10 ** TOKEN_DECIMAL);
      const tokenPrice = parseInt(
        (ROUND_PRICES[0] * 10 ** PRICE_DECIMAL).toString()
      );

      await program.methods
        .createPresale(
          TOKEN_PUBKEY,
          SOL_TOKEN_PUBKEY,
          USDT_TOKEN_PUBKEY,
          USDC_TOKEN_PUBKEY,
          new anchor.BN(10 ** TOKEN_DECIMAL),
          new anchor.BN(bigIntHardcap.toString()),
          new anchor.BN(bigIntBuyerHardcap.toString()),
          new anchor.BN(0),
          new anchor.BN(tokenPrice),
          new anchor.BN(new Date("2025-12-04T16:00:00Z").getTime() / 1000),
          new anchor.BN(new Date("2025-12-06T16:00:00Z").getTime() / 1000),
          PRESALE_ID
        )
        .accounts({
          presaleInfo: presale_info,
          authority: publicKey,
          vault: vault_info,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      toast.success("Successfully created presale.");
      return true;
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
      return false;
    } finally {
      setTransactionPending(false);
    }
  };

  const withdrawSol = async (): Promise<boolean> => {
    if (!(program && publicKey)) {
      toast.error("Wallet not connected.");
      return false;
    }

    try {
      setTransactionPending(true);

      const [presale_info, _presale_bump] = findProgramAddressSync(
        [
          utf8.encode(PRESALE_SEED),
          PRESALE_AUTHORITY.toBuffer(),
          new Uint8Array([PRESALE_ID]),
        ],
        program.programId
      );

      console.log("HHHHH - presale_info", presale_info.toString());

      const [vault_info, _vault_bump] = findProgramAddressSync(
        [utf8.encode(VAULT_SEED), presale_info.toBuffer()],
        program.programId
      );

      await program.methods
        .withdrawSol(PRESALE_ID)
        .accounts({
          presaleInfo: presale_info,
          vault: vault_info,
          presaleAuthority: PRESALE_AUTHORITY,
          buyer: publicKey,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
        })
        .rpc();

      toast.success("Successfully withdrew SOL.");
      return true;
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
      return false;
    } finally {
      setTransactionPending(false);
    }
  };

  const updatePresale = async (roundIndex: number): Promise<boolean> => {
    if (!(program && publicKey)) {
      toast.error("Wallet not connected.");
      return false;
    }

    try {
      setTransactionPending(true);

      const [presale_info, _presale_bump] = findProgramAddressSync(
        [
          utf8.encode(PRESALE_SEED),
          PRESALE_AUTHORITY.toBuffer(),
          new Uint8Array([PRESALE_ID]),
        ],
        program.programId
      );

      const bigIntHardcap =
        BigInt(TOKEN_PRESALE_HARDCAP) * BigInt(10 ** TOKEN_DECIMAL);
      const bigIntBuyerHardcap =
        BigInt(BUYER_TOKEN_HARDCAP) * BigInt(10 ** TOKEN_DECIMAL);
      const tokenPrice = parseInt(
        (ROUND_PRICES[roundIndex] * 10 ** PRICE_DECIMAL).toString()
      );

      await program.methods
        .updatePresale(
          new anchor.BN(bigIntBuyerHardcap.toString()),
          new anchor.BN(roundIndex),
          new anchor.BN(tokenPrice),
          new anchor.BN(10 ** TOKEN_DECIMAL),
          new anchor.BN(bigIntHardcap.toString()),
          new anchor.BN(new Date("2025-12-04T16:00:00Z").getTime() / 1000),
          new anchor.BN(new Date("2026-03-31T16:00:00Z").getTime() / 1000),
          PRESALE_ID
        )
        .accounts({
          presaleInfo: presale_info,
          authority: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      toast.success("Successfully updated presale.");
      return true;
    } catch (error: any) {
      console.log(error);
      return false;
    } finally {
      setTransactionPending(false);
    }
  };

  const updatePresaleToEnd = async (): Promise<boolean> => {
    if (!(program && publicKey)) {
      toast.error("Wallet not connected.");
      return false;
    }

    try {
      setTransactionPending(true);

      const [presale_info, _presale_bump] = findProgramAddressSync(
        [
          utf8.encode(PRESALE_SEED),
          PRESALE_AUTHORITY.toBuffer(),
          new Uint8Array([PRESALE_ID]),
        ],
        program.programId
      );

      const bigIntHardcap =
        BigInt(TOKEN_PRESALE_HARDCAP) * BigInt(10 ** TOKEN_DECIMAL);
      const bigIntBuyerHardcap =
        BigInt(BUYER_TOKEN_HARDCAP) * BigInt(10 ** TOKEN_DECIMAL);
      const tokenPrice = parseInt(
        (ROUND_PRICES[9] * 10 ** PRICE_DECIMAL).toString()
      );

      await program.methods
        .updatePresale(
          new anchor.BN(bigIntBuyerHardcap.toString()),
          new anchor.BN(9),
          new anchor.BN(tokenPrice),
          new anchor.BN(10 ** TOKEN_DECIMAL),
          new anchor.BN(bigIntHardcap.toString()),
          new anchor.BN(new Date("2025-12-04T16:00:00Z").getTime() / 1000),
          new anchor.BN(new Date("2025-12-06T16:00:00Z").getTime() / 1000),
          PRESALE_ID
        )
        .accounts({
          presaleInfo: presale_info,
          authority: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      toast.success("Successfully updated presale.");
      return true;
    } catch (error: any) {
      console.log(error);
      return false;
    } finally {
      setTransactionPending(false);
    }
  };

  const depositToken = async (
    depositingToken: PublicKey,
    amount: number
  ): Promise<boolean> => {
    if (!(program && publicKey)) {
      toast.error("Wallet not connected.");
      return false;
    }

    if (!depositingToken) {
      toast.error("Invalid token. Please select a valid token.");
      return false;
    }

    if (!amount || amount <= 0) {
      toast.error("Invalid amount. Please enter a positive number.");
      return false;
    }

    try {
      setTransactionPending(true);

      const [presale_info, _presale_bump] = findProgramAddressSync(
        [
          utf8.encode(PRESALE_SEED),
          PRESALE_AUTHORITY.toBuffer(),
          new Uint8Array([PRESALE_ID]),
        ],
        program.programId
      );

      const fromAssociatedTokenAccount =
        await anchor.utils.token.associatedAddress({
          mint: depositingToken,
          owner: publicKey,
        });

      const toAssociatedTokenAccount =
        await anchor.utils.token.associatedAddress({
          mint: depositingToken,
          owner: presale_info,
        });

      const depositAmount = BigInt(amount * 10 ** TOKEN_DECIMAL);

      await program.methods
        .depositToken(new anchor.BN(depositAmount.toString()), PRESALE_ID)
        .accounts({
          mintAccount: depositingToken,
          fromAssociatedTokenAccount,
          fromAuthority: publicKey,
          toAssociatedTokenAccount,
          presaleInfo: presale_info,
          payer: publicKey,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          presaleAuthority: PRESALE_AUTHORITY,
        })
        .rpc();

      toast.success("Successfully deposited token.");
      return true;
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
      return false;
    } finally {
      setTransactionPending(false);
    }
  };

  const buyToken = async (amount: number): Promise<boolean> => {
    if (!(program && publicKey)) {
      toast.error("Wallet not connected.");
      return false;
    }

    if (!amount || amount <= 0) {
      toast.error("Invalid amount. Please enter a positive number.");
      return false;
    }

    try {
      setTransactionPending(true);

      const [presaleInfo, _presaleBump] = findProgramAddressSync(
        [
          utf8.encode(PRESALE_SEED),
          PRESALE_AUTHORITY.toBuffer(),
          new Uint8Array([PRESALE_ID]),
        ],
        program.programId
      );

      const [vault_info, _vault_bump] = findProgramAddressSync(
        [utf8.encode(VAULT_SEED), presaleInfo.toBuffer()],
        program.programId
      );

      console.log("eagle presaleInfo = ", presaleInfo.toBase58());
      console.log("eagle vault_info = ", vault_info.toBase58());

      const bigIntSolAmount = BigInt(amount * 10 ** 9);

      console.log("eagle bigIntSolAmount = ", bigIntSolAmount);

      const fromAssociatedTokenAccount =
        await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: presaleInfo,
        });

      const toAssociatedTokenAccount =
        await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: publicKey,
        });

      await program.methods
        .buyToken(new anchor.BN(bigIntSolAmount.toString()), PRESALE_ID)
        .accounts({
          buyer: publicKey,
          presaleTokenMintAccount: TOKEN_PUBKEY,
          priceUpdate: SOL_PRICEFEED_ID,
          presaleInfo,
          presaleAuthority: PRESALE_AUTHORITY,
          vault: vault_info,
          fromAssociatedPresaleTokenAccount: fromAssociatedTokenAccount,
          toAssociatedPresaleTokenAccount: toAssociatedTokenAccount,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          pythSolAccount: SOL_PRICEFEED_ID,
        })
        .rpc();

      toast.success("Token purchase was successful.");
      return true;
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
      return false;
    } finally {
      setTransactionPending(false);
    }
  };

  const buyTokenStable = async (
    depositingToken: PublicKey,
    amount: number
  ): Promise<boolean> => {
    if (!(program && publicKey)) {
      toast.error("Wallet not connected.");
      return false;
    }

    if (!depositingToken) {
      toast.error("Invalid token. Please select a valid token.");
      return false;
    }

    if (!amount || amount <= 0) {
      toast.error("Invalid amount. Please enter a positive number.");
      return false;
    }

    try {
      setTransactionPending(true);

      const [presale_info, _presale_bump] = findProgramAddressSync(
        [
          utf8.encode(PRESALE_SEED),
          PRESALE_AUTHORITY.toBuffer(),
          new Uint8Array([PRESALE_ID]),
        ],
        program.programId
      );

      const fromAssociatedTokenAccount =
        await anchor.utils.token.associatedAddress({
          mint: depositingToken,
          owner: publicKey,
        });

      const toAssociatedTokenAccount =
        await anchor.utils.token.associatedAddress({
          mint: depositingToken,
          owner: presale_info,
        });

      const fromAssociatedPresaleTokenAccount =
        await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: presale_info,
        });

      const toAssociatedPresaleTokenAccount =
        await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: publicKey,
        });

      const depositAmount = BigInt(amount * 10 ** TOKEN_DECIMAL);

      await program.methods
        .buyTokenStable(new anchor.BN(depositAmount.toString()), PRESALE_ID)
        .accounts({
          buyer: publicKey,
          presaleAuthority: PRESALE_AUTHORITY,
          depositTokenMintAccount: depositingToken,
          presaleTokenMintAccount: TOKEN_PUBKEY,
          fromAssociatedTokenAccount,
          toAssociatedTokenAccount,
          presaleInfo: presale_info,
          fromAssociatedPresaleTokenAccount,
          toAssociatedPresaleTokenAccount,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
        })
        .rpc();

      console.log("eagle toast = ", toast);
      toast.success("Successfully deposited token.");
      return true;
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
      return false;
    } finally {
      setTransactionPending(false);
    }
  };

  const withdrawToken = async (
    withdrawnToken: PublicKey
  ): Promise<boolean> => {
    if (!(program && publicKey)) {
      toast.error("Wallet not connected.");
      return false;
    }

    if (!withdrawnToken) {
      toast.error("Invalid token. Please select a valid token.");
      return false;
    }

    try {
      setTransactionPending(true);

      const [presaleInfo, _presaleBump] = findProgramAddressSync(
        [
          utf8.encode(PRESALE_SEED),
          PRESALE_AUTHORITY.toBuffer(),
          new Uint8Array([PRESALE_ID]),
        ],
        program.programId
      );

      const buyer_presale_token_associated_token_account =
        await anchor.utils.token.associatedAddress({
          mint: withdrawnToken,
          owner: publicKey,
        });

      const presale_presale_token_associated_token_account =
        await anchor.utils.token.associatedAddress({
          mint: withdrawnToken,
          owner: presaleInfo,
        });

      await program.methods
        .withdrawToken(PRESALE_ID)
        .accounts({
          presaleTokenMintAccount: withdrawnToken,
          buyerPresaleTokenAssociatedTokenAccount:
            buyer_presale_token_associated_token_account,
          presalePresaleTokenAssociatedTokenAccount:
            presale_presale_token_associated_token_account,
          presaleInfo,
          presaleAuthority: PRESALE_AUTHORITY,
          buyer: publicKey,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
        })
        .rpc();

      toast.success("Token withdraw was successful.");
      return true;
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
      return false;
    } finally {
      setTransactionPending(false);
    }
  };

  return {
    createPresale,
    depositToken,
    buyToken,
    buyTokenStable,
    updatePresale,
    updatePresaleToEnd,
    getPrice,
    withdrawSol,
    withdrawToken,
    startTime,
    endTime,
    buyAmount,
    claimedAmount,
    totalBuyAmount,
    transactionPending,
  };
}