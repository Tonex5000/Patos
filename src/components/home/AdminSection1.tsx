import { PublicKey } from "@solana/web3.js";
import usePresale from "../../hooks/usePresale2";
import {
    TOKEN_PUBKEY,
    USDT_TOKEN_PUBKEY,
    USDC_TOKEN_PUBKEY,
    TOKEN_PRESALE_HARDCAP
} from "../../constants"

type AdminAction = {
    label: string;
    onClick: () => Promise<unknown>;
    variant?: "warning";
};

const baseButtonClassName = "px-4 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow disabled:opacity-60 disabled:cursor-not-allowed";
const primaryButtonClassName = `${baseButtonClassName} bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white`;
const warningButtonClassName = `${baseButtonClassName} bg-gradient-to-r from-[#9A3412] to-[#C2410C] hover:from-[#7C2D12] hover:to-[#9A3412] text-white`;

const AdminSection = () => {
    const {
        createPresale,
        createTokenAta,
        depositToken,
        updatePresale,
        updatePresaleToEnd,
        withdrawSol,
        withdrawToken,
        transactionPending,
    } = usePresale();

    const onDepositToken = async (depositingToken: PublicKey, amount: number) => {
        await depositToken(depositingToken, amount);
    };

    const onCreateTokenAta = async (mint: PublicKey) => {
        await createTokenAta(mint);
    };

    const setupActions: AdminAction[] = [
        {
            label: "Create Presale",
            onClick: createPresale,
        },
        {
            label: "Deposit MintToken",
            onClick: () => onDepositToken(TOKEN_PUBKEY, TOKEN_PRESALE_HARDCAP),
        },
        {
            label: "Create USDT ATA",
            onClick: () => onCreateTokenAta(USDT_TOKEN_PUBKEY),
        },
        {
            label: "Create USDC ATA",
            onClick: () => onCreateTokenAta(USDC_TOKEN_PUBKEY),
        },
    ];

    const updateActions: AdminAction[] = [
        { label: "Round 1", onClick: () => updatePresale(0) },
        { label: "Round 2", onClick: () => updatePresale(1) },
        { label: "Round 3", onClick: () => updatePresale(2) },
        { label: "Round 4", onClick: () => updatePresale(3) },
        { label: "Round 5", onClick: () => updatePresale(4) },
        { label: "Round 6", onClick: () => updatePresale(5) },
        { label: "Round 7", onClick: () => updatePresale(6) },
        { label: "Round 8", onClick: () => updatePresale(7) },
        { label: "Round 9", onClick: () => updatePresale(8) },
        { label: "Round 10", onClick: () => updatePresale(9) },
        { label: "End Presale", onClick: updatePresaleToEnd, variant: "warning" },
    ];

    const withdrawActions: AdminAction[] = [
        { label: "Withdraw SOL", onClick: withdrawSol, variant: "warning" },
        { label: "Withdraw MintToken", onClick: () => withdrawToken(TOKEN_PUBKEY), variant: "warning" },
        { label: "Withdraw USDT", onClick: () => withdrawToken(USDT_TOKEN_PUBKEY), variant: "warning" },
        { label: "Withdraw USDC", onClick: () => withdrawToken(USDC_TOKEN_PUBKEY), variant: "warning" },
    ];

    const renderActionButton = ({ label, onClick, variant }: AdminAction) => (
        <button
            key={label}
            className={variant === "warning" ? warningButtonClassName : primaryButtonClassName}
            style={{ fontFamily: 'Manrope' }}
            onClick={onClick}
            disabled={transactionPending}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-5 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Manrope' }}>Admin Panel</h3>

            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3" style={{ fontFamily: 'Manrope' }}>Setup</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {setupActions.map(renderActionButton)}
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3" style={{ fontFamily: 'Manrope' }}>Update Presale</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {updateActions.map(renderActionButton)}
                </div>
            </div>

            <div>
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3" style={{ fontFamily: 'Manrope' }}>Withdraw</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {withdrawActions.map(renderActionButton)}
                </div>
            </div>
        </div>
    )
}

export default AdminSection;