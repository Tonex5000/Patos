import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import usePresale from "../hooks/usePresale";

const AdminWithdraw = () => {
  const { publicKey } = useWallet();
  const { withdrawSol, transactionPending } = usePresale();

  const onWithdraw = async () => {
    await withdrawSol();
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/5 backdrop-blur p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: "Manrope" }}>
          Admin Withdraw (SOL)
        </h1>
        <p className="text-sm text-white/80 mb-6" style={{ fontFamily: "Manrope" }}>
          Connect the authorized admin Solana wallet, then click the withdraw button.
          This page calls the same on-chain <code>withdrawSol</code> instruction used in the app.
        </p>

        <div className="mb-6">
          <WalletMultiButton />
        </div>

        <div className="rounded-lg border border-white/15 bg-black/20 p-4 mb-6">
          <p className="text-xs text-white/70 mb-2">Connected wallet</p>
          <p className="text-sm break-all font-mono">
            {publicKey ? publicKey.toBase58() : "Not connected"}
          </p>
        </div>

        <button
          onClick={onWithdraw}
          disabled={!publicKey || transactionPending}
          className="w-full py-3 rounded-lg font-bold transition bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "Manrope" }}
        >
          {transactionPending ? "Processing..." : "Withdraw SOL From Vault"}
        </button>
      </div>
    </div>
  );
};

export default AdminWithdraw;
