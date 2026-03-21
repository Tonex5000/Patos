import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
    // useAnchorWallet,
    useConnection,
    useWallet,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, Connection } from '@solana/web3.js'
import * as splToken from "@solana/spl-token";
import * as anchor from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { formatEther, formatUnits, zeroAddress, createPublicClient, http } from 'viem';
import { mainnet, sepolia, bsc, bscTestnet } from 'wagmi/chains';
// import Countdown, { CountdownRenderProps } from "react-countdown";
import {
    TOKEN_PUBKEY,
    TOKEN_DECIMAL,
    TOKEN_PRESALE_HARDCAP,
    PRESALE_PROGRAM_PUBKEY,
    PRESALE_SEED,
    PRESALE_AUTHORITY,
    PRESALE_ID,
    USDT_TOKEN_PUBKEY,
    USDC_TOKEN_PUBKEY,
    ROUND_PRICES,
    ETH_PRESALE_URL,
    devMode,
    PRESALE_ADDRESS_ETH,
    PRESALE_ADDRESS_BSC
} from "../../constants";
import PRESALE_ABI from "../../config/abis/PRESALE_ABI.json";
import { IDL } from "../../idl/token_presale";
import usePresale from "../../hooks/usePresale";
import { config } from "../../config";

enum PayMethod {
    SOL = 'SOL',
    USDT = 'USDT',
    USDC = 'USDC',
    CARD = 'CARD'
}


const PresaleSection = () => {
    const { buyToken, buyTokenStable, transactionPending, startTime, endTime, getPrice } = usePresale();

    const navigate = useNavigate();
    const { publicKey, wallet } = useWallet();
    const { setVisible } = useWalletModal();
    // const anchorWallet = useAnchorWallet();
    const { connection } = useConnection();

    const [percentage, setPercentage] = useState(0);
    const [payMethod, setPayMethod] = useState<PayMethod>(PayMethod.SOL);
    const [payAmount, setPayAmount] = useState(0);
    const [tokenAmount, setTokenAmount] = useState(0);

    const [balance, setBalance] = useState(0)
    const [tokenBalance, setTokenBalance] = useState(0)
    const [totalBuyAmount, setTotalBuyAmount] = useState(0)
    const [totalUSD, setTotalUSD] = useState(0)
    const [roundIndex, setRoundIndex] = useState(0)
    const [roundPrice, setRoundPrice] = useState(0.0)
    const [ratio, setRatio] = useState(1)

    // Multi-chain data fetching
    const [solanaTokenTotal, setSolanaTokenTotal] = useState(0);
    const [solanaTotalUSD, setSolanaTotalUSD] = useState(0);
    const [ethTokenTotal, setEthTokenTotal] = useState(0);
    const [ethTotalUSD, setEthTotalUSD] = useState(0);
    const [bscTokenTotal, setBscTokenTotal] = useState(0);
    const [bscTotalUSD, setBscTotalUSD] = useState(0);

    const onBuy = async () => {
        // Prevent double submission
        if (transactionPending) {
            toast.warning("Transaction is already pending. Please wait...");
            return;
        }

        if (publicKey === null) {
            setVisible(true);
            return;
        }

        if (balance < payAmount) {
            toast.warning("Please check balance again.");
            return;
        }

        if (payAmount <= 0) {
            toast.warning("Please input pay amount.");
            return;
        }

        if (Date.now() < startTime * 1000 || Date.now() > endTime * 1000) {
            toast.warning("Pre-sale is not availalbe now.");
            return;
        }

        if (payMethod === "SOL") { buyToken(payAmount); }
        else {
            if (payMethod === "USDT") {
                buyTokenStable(USDT_TOKEN_PUBKEY, payAmount)
            } else if (payMethod === "USDC") {
                buyTokenStable(USDC_TOKEN_PUBKEY, payAmount)
            }
        }
    };

    // const program = useMemo(() => {
    //     if (anchorWallet) {
    //         const provider = new anchor.AnchorProvider(
    //             connection,
    //             anchorWallet,
    //             anchor.AnchorProvider.defaultOptions()
    //         );
    //         return new anchor.Program(IDL as anchor.Idl, PRESALE_PROGRAM_PUBKEY, provider);
    //     }
    // }, [connection, anchorWallet]);

    // Create public clients for Ethereum and BSC
    const ethPublicClient = useMemo(() => {
        const chain = devMode ? sepolia : mainnet;
        return createPublicClient({
            chain,
            transport: http()
        });
    }, []);

    const bscPublicClient = useMemo(() => {
        const chain = devMode ? bscTestnet : bsc;
        return createPublicClient({
            chain,
            transport: http()
        });
    }, []);

    // Fetch Ethereum chain data
    const fetchEthData = useCallback(async () => {
        try {
            console.log('Fetching Ethereum data...');
            const ethPresaleAddress = PRESALE_ADDRESS_ETH as `0x${string}`;
            if (!ethPresaleAddress || ethPresaleAddress === zeroAddress) return;

            const [tokenTotal, totalUSD] = await Promise.all([
                ethPublicClient.readContract({
                    address: ethPresaleAddress,
                    abi: PRESALE_ABI,
                    functionName: 'tokenTotal',
                }),
                ethPublicClient.readContract({
                    address: ethPresaleAddress,
                    abi: PRESALE_ABI,
                    functionName: 'getTotalRaisedUSD',
                })
            ]);

            if (tokenTotal && typeof tokenTotal === 'bigint') {
                setEthTokenTotal(parseFloat(formatUnits(tokenTotal, 18)));
            }
            if (totalUSD && typeof totalUSD === 'bigint') {
                setEthTotalUSD(parseFloat(formatEther(totalUSD)));
            }
        } catch (error) {
            console.error('Error fetching Ethereum data:', error);
        }
    }, [ethPublicClient]);

    // Fetch BSC chain data
    const fetchBscData = useCallback(async () => {
        try {
            const bscPresaleAddress = PRESALE_ADDRESS_BSC as `0x${string}`;
            if (!bscPresaleAddress || bscPresaleAddress === zeroAddress) return;

            const [tokenTotal, totalUSD] = await Promise.all([
                bscPublicClient.readContract({
                    address: bscPresaleAddress,
                    abi: PRESALE_ABI,
                    functionName: 'tokenTotal',
                }),
                bscPublicClient.readContract({
                    address: bscPresaleAddress,
                    abi: PRESALE_ABI,
                    functionName: 'getTotalRaisedUSD',
                })
            ]);

            if (tokenTotal && typeof tokenTotal === 'bigint') {
                setBscTokenTotal(parseFloat(formatUnits(tokenTotal, 18)));
            }
            if (totalUSD && typeof totalUSD === 'bigint') {
                setBscTotalUSD(parseFloat(formatEther(totalUSD)));
            }
        } catch (error) {
            console.error('Error fetching BSC data:', error);
        }
    }, [bscPublicClient]);

    // Fetch Solana chain data
    const fetchSolanaData = useCallback(async () => {
        try {
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

            if (program) {
                const [presale_info] = findProgramAddressSync(
                    [
                        utf8.encode(PRESALE_SEED),
                        PRESALE_AUTHORITY.toBuffer(),
                        new Uint8Array([PRESALE_ID]),
                    ],
                    program.programId
                );
                const info: any = await program.account.presaleInfo.fetch(presale_info);

                if (info.soldTokenAmount) {
                    setSolanaTokenTotal(Number(info.soldTokenAmount) / 10 ** TOKEN_DECIMAL);
                } else {
                    setSolanaTokenTotal(0);
                }

                if (info.usdTotal) {
                    setSolanaTotalUSD(Number(info.usdTotal) / 10 ** 8);
                } else {
                    setSolanaTotalUSD(0);
                }

                setRoundIndex(info.roundIndex)
                setRoundPrice(Number(info.pricePerToken) / 10 ** 8)
            }
        } catch (error) {
            console.error('Error fetching Solana data:', error);
            setSolanaTokenTotal(0);
            setSolanaTotalUSD(0);
        }
    }, [wallet]);

    // Fetch data from all chains
    useEffect(() => {
        fetchEthData();
        fetchBscData();
        fetchSolanaData();

        const interval = setInterval(() => {
            fetchEthData();
            fetchBscData();
            fetchSolanaData();
        }, 5000); // Refresh every 5 seconds

        return () => clearInterval(interval);
    }, [fetchEthData, fetchBscData, fetchSolanaData]);

    // Aggregate data from all chains
    useEffect(() => {
        const aggregatedTokenTotal = solanaTokenTotal + ethTokenTotal + bscTokenTotal + 91827.36 / 0.00014;
        const aggregatedTotalUSD = solanaTotalUSD + ethTotalUSD + bscTotalUSD + 91827.36;

        console.log('Aggregated token total:', aggregatedTokenTotal);
        console.log('Aggregated total USD:', aggregatedTotalUSD);
        setTotalBuyAmount(aggregatedTokenTotal);
        setTotalUSD(aggregatedTotalUSD);

        const percent = (aggregatedTokenTotal / TOKEN_PRESALE_HARDCAP) * 100;
        setPercentage(percent);
    }, [solanaTokenTotal, ethTokenTotal, bscTokenTotal, solanaTotalUSD, ethTotalUSD, bscTotalUSD]);

    const getBalance = useCallback(async () => {
        setPayAmount(0);

        if (publicKey && connection) {
            try {
                if (payMethod === PayMethod.SOL) {
                    const bal = await connection.getBalance(publicKey)
                    setBalance(bal / LAMPORTS_PER_SOL)
                } else if (payMethod === PayMethod.USDT) {
                    const usdtAddress = await splToken.getAssociatedTokenAddress(USDT_TOKEN_PUBKEY, publicKey)
                    const usdtDetails = await splToken.getAccount(connection, usdtAddress)
                    if (usdtDetails.amount) setBalance(Number(usdtDetails.amount) / 1000000)
                    else setBalance(0)
                } else if (payMethod === PayMethod.USDC) {
                    const usdcAddress = await splToken.getAssociatedTokenAddress(USDC_TOKEN_PUBKEY, publicKey)
                    const usdcDetails = await splToken.getAccount(connection, usdcAddress)
                    if (usdcDetails.amount) setBalance(Number(usdcDetails.amount) / 1000000)
                    else setBalance(0)
                }
            } catch (e) {
                setBalance(0)
                console.log(e)
            }
        }
    }, [publicKey, payMethod])

    useEffect(() => {
        getBalance()
    }, [getBalance])

    const getTokenBalance = useCallback(async () => {
        if (publicKey && connection) {
            try {
                const tokenAddress = await splToken.getAssociatedTokenAddress(TOKEN_PUBKEY, publicKey)
                const tokenDetails = await splToken.getAccount(connection, tokenAddress)
                if (tokenDetails.amount) {
                    setTokenBalance(Number(tokenDetails.amount) / 1000000)
                }
            } catch (e) {
                setTokenBalance(0)
                console.log(e)
            }
        }
    }, [publicKey, transactionPending])

    useEffect(() => {
        getTokenBalance()
    }, [getTokenBalance])

    const _setRatio = useCallback(async () => {
        const price = await getPrice(payMethod)
        if (price) setRatio(parseInt((Number(price) / (roundPrice === 0 ? 1 : roundPrice)).toString()))
        else setRatio(0)
    }, [payMethod, publicKey])

    useEffect(() => {
        _setRatio()
    }, [_setRatio])

    useEffect(() => {
        setTokenAmount(parseFloat((payAmount * ratio).toFixed(2)))
    }, [payAmount, ratio])

    const onChange = (e: any) => {
        if (Number(e.target.value) >= 0) {
            setPayAmount(e.target.value)
        }
    }

    return (
        <div className="w-full md:mt-10 px-[10px] max-md:px-2 max-md:box-border max-md:w-full max-md:max-w-full py-5">
            <div className="flex w-full justify-center items-center gap-5 md:px-10 max-md:gap-2">
                <div className="w-[40%] max-md:hidden flex flex-col items-center justify-center gap-6">
                    <div className="relative w-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FECE7A]/20 via-[#FDBB55]/15 to-[#E5A841]/20 rounded-full blur-3xl"></div>
                        <img
                            src="/img/home/3c-removebg-preview_.png"
                            className="relative w-full h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                            alt="PATOS Token"
                        />
                    </div>
                    <div className="w-full text-center space-y-4">
                        <h1 className="text-4xl font-bold leading-tight" style={{
                            fontFamily: 'Manrope',
                            background: 'linear-gradient(135deg, #FECE7A 0%, #FDBB55 50%, #E5A841 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            PATOS
                        </h1>
                        <h2 className="text-2xl font-semibold leading-tight" style={{
                            fontFamily: 'Manrope',
                            background: 'linear-gradient(135deg, #FECE7A 0%, #FDBB55 50%, #E5A841 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Join the Revolution
                        </h2>
                        <div className="text-base text-gray-700 text-left leading-relaxed px-4" style={{ fontFamily: 'Manrope' }}>
                            <p>The <strong className="text-[#E5A841]">$PATOS</strong> meme coin project is about giving investors exactly what they want from crypto. A token with no pump is like owning a Mercedes-Maybach S-680 4Matic car with a 4D Burmester sound system but never turning on music.</p>
                            <p className="mt-2">Why would <strong className="text-[#E5A841]">$PATOS</strong> Pump? 111 Crypto Exchange Listings at once.</p>
                        </div>
                        <div className="flex items-center justify-center gap-2 pt-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FECE7A] to-[#E5A841] animate-pulse"></div>
                            <span className="text-sm font-semibold text-[#E5A841]" style={{ fontFamily: 'Manrope' }}>Limited Time Presale</span>
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FECE7A] to-[#E5A841] animate-pulse"></div>
                        </div>
                        <div className="flex items-center justify-center pt-3">
                            <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FECE7A]/10 to-[#E5A841]/10 border border-[#FECE7A]/30 shadow-sm">
                                <span className="text-sm font-semibold text-[#E5A841]" style={{ fontFamily: 'Manrope' }}>Join Our Movement</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3 pt-2">
                            <a
                                href="https://t.me/patosmemecoin"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-sm font-medium"
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                                <span>Telegram</span>
                            </a>
                            <a
                                href="https://reddit.com/r/PatosMemecoin"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-sm font-medium"
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.238-2.512-.73a.361.361 0 0 0-.464.03.33.33 0 0 0-.006.463z" />
                                </svg>
                                <span>Reddit</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 max-md:w-full md:ml-auto rounded-2xl p-6 max-md:p-4 bg-white" style={{
                    border: '2px solid transparent',
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #FECE7A 0%, #FDBB55 25%, #E5A841 50%, #FDBB55 75%, #FECE7A 100%) border-box',
                    boxShadow: '0 10px 40px rgba(229, 168, 65, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                }}>
                    <div className="flex flex-col gap-[10px]">
                        {/* <div className="w-full flex items-center justify-center gap-3">
                        <img src="/img/home/patos-coin.png" className="w-[52.36px] h-[49.5px]" />
                        <span className="text-[40px] luckiest-text leading-none" style={{ fontFamily: 'ArchivoBlack' }}>PRESALE</span>
                    </div> */}
                        {/* <div className="text-[14px] leading-[17px] tracking-wide uppercase text-left max-md:text-center text-gray-800" style={{ fontFamily: 'Manrope' }}>
                        {Date.now() < startTime * 1000 && "Pre-Sale Starts In"}
                        {Date.now() >= startTime * 1000 && Date.now() < endTime * 1000 && "Pre-Sale Ends In"}
                        {Date.now() > endTime * 1000 && ""}
                    </div>
                    {endTime ? Date.now() < endTime * 1000 ? (
                        <Countdown
                            date={
                                Date.now() < startTime * 1000 ? startTime * 1000 : endTime * 1000
                            }
                            renderer={renderer}
                        />
                    ) : (
                        <span className="text-3xl font-bold text-red-600 max-md:text-center max-md:text-2xl">
                            Presale Completed.
                        </span>
                    ) : <span className="text-3xl font-bold text-[#E5A841] max-md:text-center max-md:text-2xl">
                        Please connect your wallet.
                    </span>
                    } */}
                        <div className="w-full flex items-center justify-center max-md:px-1">
                            <div className="relative w-full flex items-center justify-between gap-4 max-md:gap-2 px-6 max-md:px-3 py-4 max-md:py-2.5 rounded-xl bg-gradient-to-br from-[#FECE7A]/15 via-[#E5A841]/12 to-[#FECE7A]/15 border-2 border-[#E5A841]/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                                <div className="relative flex items-center gap-2 max-md:gap-1.5">
                                    <div className="flex items-center gap-1.5 max-md:gap-1">
                                        <div className="w-2 h-2 max-md:w-1.5 max-md:h-1.5 rounded-full bg-[#E5A841] animate-pulse shadow-lg shadow-[#E5A841]/50"></div>
                                        <span className="text-sm max-md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: 'Manrope' }}>Current Stage</span>
                                    </div>
                                </div>
                                <div className="relative flex items-center gap-1.5 max-md:gap-1">
                                    <span className="text-2xl max-md:text-sm font-extrabold bg-gradient-to-r from-[#E5A841] to-[#E5A841] bg-clip-text text-transparent drop-shadow-sm whitespace-nowrap" style={{ fontFamily: 'Manrope-Bold' }}>
                                        Stage {roundIndex !== undefined ? roundIndex + 1 : 1}
                                    </span>
                                    <span className="text-gray-400 font-medium max-md:text-xs whitespace-nowrap" style={{ fontFamily: 'Manrope' }}>of</span>
                                    <span className="text-xl max-md:text-sm font-bold text-gray-700 whitespace-nowrap" style={{ fontFamily: 'Manrope' }}>
                                        {ROUND_PRICES.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row flex-wrap max-md:flex-col items-center max-md:items-stretch justify-between gap-2 max-md:gap-3 rounded-lg px-4">
                            <div className="flex-1 min-w-[calc(50%-0.25rem)] max-md:min-w-full text-left">
                                <div className="text-sm text-gray-500 mb-1.5 font-medium" style={{ fontFamily: 'Manrope' }}>Current Price</div>
                                <div className="text-lg font-bold text-gray-900 break-words" style={{ fontFamily: 'Manrope' }}>
                                    ${ROUND_PRICES[roundIndex]}
                                </div>
                            </div>
                            <div className="flex-1 min-w-[calc(50%-0.25rem)] max-md:min-w-full max-md:text-left text-right">
                                <div className="text-sm text-gray-500 mb-1.5 font-medium" style={{ fontFamily: 'Manrope' }}>Next Stage Price</div>
                                <div className="text-lg font-bold text-gray-900 break-words" style={{ fontFamily: 'Manrope' }}>
                                    {roundIndex >= 0 && roundIndex + 1 < ROUND_PRICES.length ? (
                                        <>
                                            ${ROUND_PRICES[roundIndex + 1]}
                                            {roundPrice > 0 && (
                                                <span className="text-green-600 ml-1">
                                                    (+{(((ROUND_PRICES[roundIndex + 1] - roundPrice) / roundPrice) * 100).toFixed(2)}%)
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        'N/A'
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Manrope' }}>Progress</span>
                                <span className="text-sm font-bold text-gray-800" style={{ fontFamily: 'Manrope' }}>
                                    {percentage.toFixed(2)}%
                                </span>
                            </div>
                            <div className="relative w-full h-10 rounded-full bg-gray-200 border border-gray-300 overflow-hidden shadow-sm">
                                <div
                                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out overflow-hidden"
                                    style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                        background: 'linear-gradient(90deg, #FECE7A 0%, #FDBB55 50%, #E5A841 100%)',
                                        boxShadow: '0 4px 15px rgba(254, 206, 122, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.3)'
                                    }}
                                >
                                    <div
                                        className="animate-shimmer top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                                        style={{
                                            transform: 'skewX(-20deg)'
                                        }}
                                    ></div>
                                </div>
                                {percentage > 8 && (
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 text-black font-bold text-xs sm:text-sm pointer-events-none transition-all duration-700 whitespace-nowrap"
                                        style={{
                                            left: `${Math.min(percentage - 3, 95)}%`,
                                            textShadow: '0 1px 3px rgba(255, 255, 255, 0.9)'
                                        }}
                                    >
                                        {percentage.toFixed(2)}%
                                    </div>
                                )}
                                {percentage <= 8 && (
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 font-bold text-xs sm:text-sm pointer-events-none">
                                        {percentage.toFixed(2)}%
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-500 mb-1 font-medium" style={{ fontFamily: 'Manrope' }}>USD Raised</div>
                                <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'Manrope' }}>
                                    ${totalUSD ? (Number(totalUSD)).toFixed(0).toLocaleString() : 0} / ${(24000000).toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-500 mb-1 font-medium" style={{ fontFamily: 'Manrope' }}>Tokens Sold</div>
                                <div className="text-base font-bold text-gray-900" style={{ fontFamily: 'Manrope' }}>
                                    {totalBuyAmount ? (Number(totalBuyAmount)).toFixed(0).toLocaleString() : 0} / {(111111111111).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full gap-2">
                            <div
                                className={`${payMethod === PayMethod.SOL ? 'bg-[#E5A841] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-all rounded-lg flex items-center justify-center px-4 py-2.5 w-full gap-2 cursor-pointer border-2 ${payMethod === PayMethod.SOL ? 'border-[#E5A841]' : 'border-transparent'}`}
                                onClick={() => { setPayMethod(PayMethod.SOL); }}
                            >
                                <img src="/img/home/sol.png" alt="sol" className="md:h-[32px] max-md:h-[30px]" />
                                <span className="text-base font-bold" style={{ fontFamily: 'Manrope' }}>SOL</span>
                            </div>
                            <div
                                className={`${payMethod === PayMethod.USDT ? 'bg-[#E5A841] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-all rounded-lg flex items-center justify-center px-4 py-2.5 w-full gap-2 cursor-pointer border-2 ${payMethod === PayMethod.USDT ? 'border-[#E5A841]' : 'border-transparent'}`}
                                onClick={() => { setPayMethod(PayMethod.USDT); }}
                            >
                                <img src="/img/home/tether.png" alt="tether" className="md:h-[32px] max-md:h-[30px]" />
                                <span className="text-base font-bold" style={{ fontFamily: 'Manrope' }}>USDT</span>
                            </div>
                            <div
                                className={`${payMethod === PayMethod.USDC ? 'bg-[#E5A841] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-all rounded-lg flex items-center justify-center px-4 py-2.5 w-full gap-2 cursor-pointer border-2 ${payMethod === PayMethod.USDC ? 'border-[#E5A841]' : 'border-transparent'}`}
                                onClick={() => { setPayMethod(PayMethod.USDC); }}
                            >
                                <img src="/img/home/usdc.png" alt="usdc" className="md:h-[32px] max-md:h-[30px]" />
                                <span className="text-base font-bold" style={{ fontFamily: 'Manrope' }}>USDC</span>
                            </div>
                            {/* <div
                            className={`${payMethod === PayMethod.CARD ? 'bg-[#E5A841]' : 'bg-[#FECE7A]'} hover:bg-[#FDBB55] rounded-lg flex items-center justify-center px-4 py-2 w-full gap-1 cursor-pointer`}
                            onClick={() => { setPayMethod(PayMethod.CARD); }}
                        >
                            <img src="/img/home/visa.png" alt="visa" className="md:h-[32px]  max-md:h-[30px]" />
                            <span className="text-base font-bold text-white" style={{ fontFamily: 'Manrope' }}>CARD</span>
                        </div> */}
                        </div>
                        {/* sol amount */}
                        <div className="flex flex-raw justify-between items-center">
                            <div className="text-gray-800 max-md:text-lg" style={{ fontFamily: 'Manrope' }}>
                                Amount you pay:
                            </div>
                            <div className="flex flex-row font-medium leading-[15.73px] text-gray-600 items-center" style={{ fontFamily: 'Manrope' }}>
                                <img src='/img/home/wallet.svg' className='ml-0.5' />
                                <div>{balance.toFixed(2)} {payMethod}</div>
                            </div>
                        </div>

                        <div className="w-full relative">
                            <div className="absolute left-3 flex gap-1 top-1/2 text-gray-500 -translate-y-1/2 z-10">
                                <img src={payMethod === PayMethod.SOL ? "/img/home/sol.png" : payMethod === PayMethod.USDT ? "/img/home/tether.png" : '/img/home/usdc.png'} className="w-6" />
                            </div>
                            <input
                                className="rounded-lg w-full bg-white text-gray-900 h-[48px] pl-12 pr-20 no-spinner border-2 border-gray-300 focus:border-[#E5A841] focus:outline-none focus:ring-2 focus:ring-[#E5A841]/20 transition-all"
                                style={{ fontFamily: 'Manrope' }}
                                type="number"
                                placeholder="Enter Amount"
                                value={payAmount}
                                onChange={e => onChange(e)}
                            />
                            <div className="absolute right-2 flex gap-1 top-1/2 -translate-y-1/2 z-10">
                                <button
                                    className="bg-gradient-to-r from-[#E5A841] to-[#FECE7A] hover:from-[#D19114] hover:to-[#E5A841] text-white py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all shadow-sm hover:shadow"
                                    onClick={() => {
                                        if (payMethod === PayMethod.SOL) {
                                            const value = Number(balance) - 0.01;
                                            setPayAmount(value > 0 ? parseFloat(value.toFixed(2)) : 0)
                                        } else if (payMethod === PayMethod.USDT) {
                                            setPayAmount(parseFloat(balance.toFixed(2)))
                                        } else if (payMethod === PayMethod.USDC) {
                                            setPayAmount(parseFloat(balance.toFixed(2)))
                                        }
                                    }}
                                >
                                    Max
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-raw justify-between items-center">
                            <div className="text-gray-800 max-md:text-lg" style={{ fontFamily: 'Manrope' }}>
                                Amount in <span className="font-bold">PATOS</span> You Receive:
                            </div>
                            <div className="flex flex-row font-medium leading-[15.73px] text-gray-600 items-center" style={{ fontFamily: 'Manrope' }}>
                                <img src='/img/home/wallet.svg' className='ml-0.5' />
                                <div>{tokenBalance.toFixed(0)} PATOS</div>
                            </div>
                        </div>
                        {/* PATOS amount */}
                        <div className="w-full relative">
                            <div className="absolute left-3 flex gap-1 top-1/2 text-gray-500 -translate-y-1/2 z-10">
                                <img src="/img/home/patos-coin.png" className="w-6" />
                            </div>
                            <input
                                className="rounded-lg w-full bg-gray-50 text-gray-900 h-[48px] pl-12 pr-2 border-2 border-gray-300 cursor-not-allowed"
                                style={{ fontFamily: 'Manrope' }}
                                placeholder="Enter Amount"
                                value={tokenAmount}
                                disabled
                            />
                        </div>

                        {/* buy button */}
                        <div
                            className="w-full bg-gradient-to-r from-[#E5A841] to-[#FECE7A] hover:from-[#D19114] hover:to-[#E5A841] rounded-lg flex items-center justify-center text-white py-3 cursor-pointer font-bold max-md:text-lg shadow-md hover:shadow-lg transition-all"
                            style={{ fontFamily: 'Manrope-Bold' }}
                            onClick={onBuy}
                        >
                            {!transactionPending ? (publicKey === null ? "Connect & Buy PATOS" : "Buy PATOS") : "Buying..."}
                        </div>

                        {/* ETH Presale Button */}
                        <a
                            href={ETH_PRESALE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-[#627EEA] to-[#E2761B] hover:from-[#4E63D2] hover:to-[#C86215] rounded-lg flex items-center justify-center text-white py-3 cursor-pointer font-bold max-md:text-base shadow-md hover:shadow-lg transition-all mt-3"
                            style={{ fontFamily: 'Manrope-Bold' }}
                        >
                            <img src="/img/home/eth.png" alt="Ethereum" className="w-6 h-6 mr-2" />
                            Buy with ETH on Ethereum/BSC
                        </a>

                        <div className="w-full flex flex-row justify-center items-center gap-4 mt-2">
                            <div className="text-base font-bold max-md:text-sm text-gray-800" style={{ fontFamily: 'Manrope' }}>
                                NEED HELP?
                            </div>
                            <div
                                className="border-1 border-gray-800 text-gray-800 uppercase text-base leading-none p-3 rounded-lg font-extrabold max-md:text-sm max-md:text-center cursor-pointer hover:bg-gray-100 transition-colors"
                                style={{ fontFamily: 'Manrope' }}
                                onClick={() => { navigate("/new-to-crypto"); }}
                            >
                                NEW TO CRYPTO
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

// const renderer = ({
//     days,
//     hours,
//     minutes,
//     seconds,
//     completed,
// }: CountdownRenderProps) => {
//     if (completed) {
//         // Render a completed state
//         // return <Completionist />;
//     } else {
//         // Render a countdown
//         const formatNumber = (num: number) => num >= 10 ? num.toString() : '0' + num.toString();

//         return (
//             <div className="flex flex-row justify-center items-center gap-3 md:gap-4 mt-4" style={{ fontFamily: 'Manrope' }}>
//                 <div className="flex flex-col items-center gap-2">
//                     <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 shadow-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[90px] text-center">
//                         <div className="absolute inset-0 bg-gradient-to-br from-[#FECE7A]/5 to-[#E5A841]/5 rounded-xl"></div>
//                         <div className="relative text-2xl md:text-3xl font-bold leading-tight" style={{
//                             background: 'linear-gradient(135deg, #FECE7A 0%, #FDBB55 50%, #E5A841 100%)',
//                             WebkitBackgroundClip: 'text',
//                             WebkitTextFillColor: 'transparent',
//                             backgroundClip: 'text'
//                         }}>
//                             {formatNumber(days)}
//                         </div>
//                     </div>
//                     <div className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">Days</div>
//                 </div>

//                 <div className="flex flex-col items-center justify-center h-full pt-8">
//                     <div className="text-2xl md:text-3xl font-bold text-[#E5A841] animate-pulse">:</div>
//                 </div>

//                 <div className="flex flex-col items-center gap-2">
//                     <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 shadow-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[90px] text-center">
//                         <div className="absolute inset-0 bg-gradient-to-br from-[#FECE7A]/5 to-[#E5A841]/5 rounded-xl"></div>
//                         <div className="relative text-2xl md:text-3xl font-bold leading-tight" style={{
//                             background: 'linear-gradient(135deg, #FECE7A 0%, #FDBB55 50%, #E5A841 100%)',
//                             WebkitBackgroundClip: 'text',
//                             WebkitTextFillColor: 'transparent',
//                             backgroundClip: 'text'
//                         }}>
//                             {formatNumber(hours)}
//                         </div>
//                     </div>
//                     <div className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">Hours</div>
//                 </div>

//                 <div className="flex flex-col items-center justify-center h-full pt-8">
//                     <div className="text-2xl md:text-3xl font-bold text-[#E5A841] animate-pulse">:</div>
//                 </div>

//                 <div className="flex flex-col items-center gap-2">
//                     <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 shadow-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[90px] text-center">
//                         <div className="absolute inset-0 bg-gradient-to-br from-[#FECE7A]/5 to-[#E5A841]/5 rounded-xl"></div>
//                         <div className="relative text-2xl md:text-3xl font-bold leading-tight" style={{
//                             background: 'linear-gradient(135deg, #FECE7A 0%, #FDBB55 50%, #E5A841 100%)',
//                             WebkitBackgroundClip: 'text',
//                             WebkitTextFillColor: 'transparent',
//                             backgroundClip: 'text'
//                         }}>
//                             {formatNumber(minutes)}
//                         </div>
//                     </div>
//                     <div className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">Minutes</div>
//                 </div>

//                 <div className="flex flex-col items-center justify-center h-full pt-8">
//                     <div className="text-2xl md:text-3xl font-bold text-[#E5A841] animate-pulse">:</div>
//                 </div>

//                 <div className="flex flex-col items-center gap-2">
//                     <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 shadow-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[90px] text-center">
//                         <div className="absolute inset-0 bg-gradient-to-br from-[#FECE7A]/5 to-[#E5A841]/5 rounded-xl"></div>
//                         <div className="relative text-2xl md:text-3xl font-bold leading-tight" style={{
//                             background: 'linear-gradient(135deg, #FECE7A 0%, #FDBB55 50%, #E5A841 100%)',
//                             WebkitBackgroundClip: 'text',
//                             WebkitTextFillColor: 'transparent',
//                             backgroundClip: 'text'
//                         }}>
//                             {formatNumber(seconds)}
//                         </div>
//                     </div>
//                     <div className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">Seconds</div>
//                 </div>
//             </div>
//         );
//     }
// };

export default PresaleSection;