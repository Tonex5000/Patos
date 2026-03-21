import { ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    Coin98WalletAdapter,
    // LedgerWalletAdapter,
    NekoWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SkyWalletAdapter,
    TokenPocketWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
// import { clusterApiUrl } from '@solana/web3.js';
import {config} from "../config";

interface WalletContextProviderProps {
    children: ReactNode;
}

export const WalletContextProvider = ({ children }: WalletContextProviderProps) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = config.isMainnet ? config.mainNetRpcUrl : config.devNetRpcUrl;

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new Coin98WalletAdapter(),
            // new LedgerWalletAdapter(),
            new NekoWalletAdapter(),
            new SkyWalletAdapter(),
            new TokenPocketWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};


export default WalletContextProvider;
