import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import "@solana/wallet-adapter-react-ui/styles.css";
import App from './App.tsx'
import WalletContextProvider from './contexts/WalletContext'

import { Buffer } from 'buffer';
window.Buffer = Buffer;


import { WagmiProvider } from "wagmi";
import { mainnet, sepolia, bsc, bscTestnet } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  metaMaskWallet,
  trustWallet,
  coinbaseWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets';

const config = getDefaultConfig({
  appName: 'patos',
  projectId: 'f3ffc246326418b235185447587e2641',
  wallets: [
    {
      groupName: 'BSC wallets',
      wallets: [metaMaskWallet, trustWallet, coinbaseWallet, walletConnectWallet],
    },
  ],
  chains: [
    mainnet,
    sepolia,
    bsc,
    bscTestnet
  ],
  ssr: true,
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          showRecentTransactions={true}
          modalSize="compact"
          initialChain={bscTestnet}
          theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          <WalletContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WalletContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
