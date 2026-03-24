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
  ROUND_PRICES
} from "../constants";
import { toast } from "react-toastify";
import { SystemProgram, PublicKey, Connection, Transaction } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { ASSOCIATED_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import {config} from "../config";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export default function usePresale() {
  const { publicKey, wallet, sendTransaction } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const [transactionPending, setTransactionPending] = useState(false);
  const [_loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [buyAmount, _setBuyAmount] = useState(0);
  const [claimedAmount, _setClaimedAmount] = useState(0);
  const [totalBuyAmount, setTotalBuyAmount] = useState(0);

  const isRecoverableBlockhashError = (error: unknown): boolean => {
    const message = error instanceof Error ? error.message : String(error ?? "");
    return (
      message.includes("Blockhash not found") ||
      message.includes("TransactionExpiredBlockheightExceededError")
    );
  };

  const executeRpcWithRetry = async (
    runRpc: () => Promise<string>,
    operationLabel: string
  ): Promise<string> => {
    try {
      return await runRpc();
    } catch (error) {
      if (!isRecoverableBlockhashError(error)) {
        throw error;
      }

      toast.info(`${operationLabel}: refreshing blockhash and retrying once...`);
      return await runRpc();
    }
  };

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(IDL as anchor.Idl, PRESALE_PROGRAM_PUBKEY, provider);
    }
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
          console.log("eagle presale_info = ", presale_info.toBase58())
          const info = await program.account.presaleInfo.fetch(presale_info);
          console.log("presale_info", info.authority.toBase58(), presale_info.toBase58(), Number(info.bump), info.identifier);
          setStartTime(Number(info.startTime));
          setEndTime(Number(info.endTime));
          setTotalBuyAmount(info.soldTokenAmount);
        } catch (error) {
          console.error("Error fetching presale info:", error);
          toast.error("Failed to fetch presale information. Please check your connection.");
        } finally {
          setLoading(false);
        }
      }
    };
    
    getPresaleInfo();
  }, [publicKey, program, transactionPending, connection, anchorWallet]);

  useEffect(() => {
      const connection = new Connection(
        config.isMainnet ? config.mainNetRpcUrl : config.devNetRpcUrl,
        "confirmed"
      );
      let provider = new anchor.AnchorProvider(
        connection,
        //@ts-ignore
        wallet,
        anchor.AnchorProvider.defaultOptions()
      );
      const program = new anchor.Program(IDL as anchor.Idl, PRESALE_PROGRAM_PUBKEY, provider);
      const getPresaleInfo = async ()=> {
        if (program && !transactionPending) {
          try {
            setLoading(true);
            const [presale_info] = findProgramAddressSync(
              [
                utf8.encode(PRESALE_SEED),
                PRESALE_AUTHORITY.toBuffer(),
                new Uint8Array([Number(PRESALE_ID)]),
              ],
              program.programId
            );
            const info = await program.account.presaleInfo.fetch(presale_info);
            
            setStartTime(Number(info.startTime));
            setEndTime(Number(info.endTime));
            setTotalBuyAmount(info.soldTokenAmount);
  
          } catch (error) {
            console.error("Error fetching presale info:", error);
            toast.error("Failed to fetch presale information. Please check your connection.");
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
        const resp = await fetch(`https://api.coinbase.com/v2/prices/SOL-USD/spot`);
        if (resp.ok) {
          const r = await resp.json();
          return parseFloat(r.data.amount);
        }
      } catch (error) {
        console.error("Error fetching from Coinbase API:", error);
      }

      try {
        const resp = await fetch(`https://api.diadata.org/v1/assetQuotation/Solana/0x0000000000000000000000000000000000000000`);
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
  }

  const createPresale = async () => {
    if (program && publicKey) {
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
          [
            utf8.encode(VAULT_SEED),
            presale_info.toBuffer()
          ],
          program.programId
        );

        console.log("eagle presale_info = ", presale_info.toBase58())

        const bigIntHardcap =
          BigInt(TOKEN_PRESALE_HARDCAP) * BigInt(10 ** TOKEN_DECIMAL);
        const bigIntBuyerHardcap =
          BigInt(BUYER_TOKEN_HARDCAP) * BigInt(10 ** TOKEN_DECIMAL);
        const tokenPrice = parseInt((ROUND_PRICES[0] * 10 ** PRICE_DECIMAL).toString());

        await program.methods
          .createPresale(
            TOKEN_PUBKEY,
            SOL_TOKEN_PUBKEY,
            USDT_TOKEN_PUBKEY,
            USDC_TOKEN_PUBKEY,
            new anchor.BN(10 ** TOKEN_DECIMAL), // softcap
            new anchor.BN(bigIntHardcap.toString()), // hardcap
            new anchor.BN(bigIntBuyerHardcap.toString()), // maxTokenAmountPerAddress
            new anchor.BN(0), // minTokenAmountPerAddress
            new anchor.BN(tokenPrice), // price per token
            new anchor.BN(new Date("2025-12-04T16:00:00Z").getTime() / 1000), // start time
            new anchor.BN(new Date("2025-12-06T16:00:00Z").getTime() / 1000), // end time
            PRESALE_ID // presale id
          )
          .accounts({
            presaleInfo: presale_info,
            authority: publicKey,
            vault: vault_info,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        toast.success("Successfully created presale.");
        return false;
      } catch (error:any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const withdrawSol = async () => {
    if (program && publicKey) {
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
          [
            utf8.encode(VAULT_SEED),
            presale_info.toBuffer()
          ],
          program.programId
        );
        await executeRpcWithRetry(
          () =>
            program.methods
              .withdrawSol(
                PRESALE_ID // presale id
              )
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
              .rpc(),
          "Withdraw SOL"
        );
        toast.success("Successfully withdrawed sol.");
        return false;
      } catch (error:any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const updatePresale = async (roundIndex: number) => {
    if (program && publicKey) {
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
        const tokenPrice = parseInt((ROUND_PRICES[roundIndex] * 10 ** PRICE_DECIMAL).toString());

        await program.methods
          .updatePresale(
            new anchor.BN(bigIntBuyerHardcap), // maxTokenAmountPerAddress
            new anchor.BN(roundIndex), // round index
            new anchor.BN(tokenPrice), // pricePerToken
            new anchor.BN(10 ** TOKEN_DECIMAL), //softcapAmount
            new anchor.BN(bigIntHardcap), // hardcapAmount
            new anchor.BN(new Date("2025-12-04T16:00:00Z").getTime() / 1000), // start time
            new anchor.BN(new Date("2026-03-31T16:00:00Z").getTime() / 1000), // end time
            PRESALE_ID // presale id
          )
          .accounts({
            presaleInfo: presale_info,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        toast.success("Successfully updated presale.");
        return false;
      } catch (error) {
        console.log(error);
        // toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const updatePresaleToEnd = async () => {
    if (program && publicKey) {
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
        const tokenPrice = parseInt((ROUND_PRICES[9] * 10 ** PRICE_DECIMAL).toString());

        await program.methods
          .updatePresale(
            new anchor.BN(bigIntBuyerHardcap), // maxTokenAmountPerAddress
            new anchor.BN(9), // round index
            new anchor.BN(tokenPrice), // pricePerToken
            new anchor.BN(10 ** TOKEN_DECIMAL), //softcapAmount
            new anchor.BN(bigIntHardcap), // hardcapAmount
            new anchor.BN(new Date("2025-12-04T16:00:00Z").getTime() / 1000), // start time
            new anchor.BN(new Date("2025-12-06T16:00:00Z").getTime() / 1000), // end time
            PRESALE_ID // presale id
          )
          .accounts({
            presaleInfo: presale_info,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        toast.success("Successfully updated presale.");
        return false;
      } catch (error) {
        console.log(error);
        // toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const createTokenAta = async (mint: PublicKey): Promise<boolean> => {
    if (!publicKey) {
      toast.error("Connect your wallet to create a token account.");
      return false;
    }

    if (!sendTransaction) {
      toast.error("Wallet does not support sending transactions.");
      return false;
    }

    try {
      setTransactionPending(true);
      const associatedTokenAddress = await getAssociatedTokenAddress(mint, publicKey);
      const accountInfo = await connection.getAccountInfo(associatedTokenAddress);

      if (accountInfo) {
        toast.info("Associated token account already exists.");
        return true;
      }

      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          publicKey,
          associatedTokenAddress,
          publicKey,
          mint
        )
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      toast.success("Associated token account created successfully.");
      return true;
    } catch (error: unknown) {
      console.error(error);
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message);
      return false;
    } finally {
      setTransactionPending(false);
    }
  };

  const depositToken = async (depositingToken: PublicKey, amount: number): Promise<boolean> => {
    if (program && publicKey) {
      // Validate inputs
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

        // Use BigInt for large number calculations
        const depositAmount =
          BigInt(amount * (10 ** TOKEN_DECIMAL));

        await program.methods
          .depositToken(
            new anchor.BN(depositAmount), // deposit amount
            PRESALE_ID // presale id
          )
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
            // pythAccount,
          })
          .rpc();
        toast.success("Successfully deposited token.");
        return false;
      } catch (error:any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }

    return false;
  };

  const buyToken = async (amount: number): Promise<boolean> => {
    if (program && publicKey) {
      // Validate input
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
          [
            utf8.encode(VAULT_SEED),
            presaleInfo.toBuffer()
          ],
          program.programId
        );
        console.log("eagle presaleInfo = ", presaleInfo.toBase58())
        console.log("eagle vault_info = ", vault_info.toBase58())

        // Use BigInt for large number calculations

        const bigIntSolAmount =
          BigInt(amount * (10 ** 9));

        console.log("eagle bigIntSolAmount = ", bigIntSolAmount)


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
          .buyToken(
            new anchor.BN(bigIntSolAmount), // sol amount = token amount * pricePerToken
            PRESALE_ID
          )
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
            pythSolAccount: SOL_PRICEFEED_ID
          })
          .rpc();
        toast.success("Token purchase was successful.");
        return false;
      } catch (error:any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }

    return false;
  };

  const buyTokenStable = async (depositingToken: PublicKey, amount: number): Promise<boolean> => {
    if (program && publicKey) {
      // Validate inputs
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

        // Use BigInt for large number calculations
        const depositAmount =
          BigInt(amount * (10 ** TOKEN_DECIMAL));

        await program.methods
          .buyTokenStable(
            new anchor.BN(depositAmount), // deposit amount
            PRESALE_ID // presale id
          )
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
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID
          })
          .rpc();
          console.log("eagle toast = ", toast);
        toast.success("Successfully deposited token.");
        return false;
      } catch (error:any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }

    return false;
  };

  const withdrawToken = async (withdrawnToken: PublicKey): Promise<boolean> => {
    if (program && publicKey) {
      // Validate input
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
          .withdrawToken(
            PRESALE_ID
          )
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
        return false;
      } catch (error:any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }

    return false;
  };

  return {
    createPresale,
    createTokenAta,
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