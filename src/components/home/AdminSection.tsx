import usePresale from "../../hooks/usePresale";
import {
    TOKEN_PUBKEY,
    USDT_TOKEN_PUBKEY,
    USDC_TOKEN_PUBKEY,
    TOKEN_PRESALE_HARDCAP
} from "../../constants"

const AdminSection = () => {
    const {
        createPresale,
        depositToken,
        updatePresale,
        updatePresaleToEnd,
        withdrawSol,
        withdrawToken
    } = usePresale();

    const onCreatePresale = async () => {
        await createPresale();
    };

    const onDepositToken = async (depositingToken: any, amount: any) => {
        await depositToken(depositingToken, amount);
    };

    const onWithdrawToken = async (withdrawingToken: any) => {
        await withdrawToken(withdrawingToken);
    };

    const onUpdatePresaleRound1 = async () => {
        await updatePresale(0);
    };

    const onUpdatePresaleRound2 = async () => {
        await updatePresale(1);
    };

    const onUpdatePresaleRound3 = async () => {
        await updatePresale(2);
    };

    const onUpdatePresaleRound4 = async () => {
        await updatePresale(3);
    };

    const onUpdatePresaleRound5 = async () => {
        await updatePresale(4);
    };

    const onUpdatePresaleRound6 = async () => {
        await updatePresale(5);
    };

    const onUpdatePresaleRound7 = async () => {
        await updatePresale(6);
    };

    const onUpdatePresaleRound8 = async () => {
        await updatePresale(7);
    };

    const onUpdatePresaleRound9 = async () => {
        await updatePresale(8);
    };

    const onUpdatePresaleRound10 = async () => {
        await updatePresale(9);
    };

    const onUpdatePresaleToEnd = async () => {
        await updatePresaleToEnd();
    };

    const onWithdrawSol = async () => {
        await withdrawSol();
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-5 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Manrope' }}>Admin Panel</h3>

            {/* Setup Section */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3" style={{ fontFamily: 'Manrope' }}>Setup</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onCreatePresale}
                    >
                        Create Presale
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={() => onDepositToken(TOKEN_PUBKEY, TOKEN_PRESALE_HARDCAP)}
                    >
                        Deposit MintToken
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={() => onWithdrawToken(USDT_TOKEN_PUBKEY)}
                    >
                        Create USDT ATA
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={() => onWithdrawToken(USDC_TOKEN_PUBKEY)}
                    >
                        Create USDC ATA
                    </button>
                </div>
            </div>

            {/* Update Section */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3" style={{ fontFamily: 'Manrope' }}>Update Presale</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {/* <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresale}
                    >
                        Update Presale
                    </button> */}
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleRound1}
                    >
                        Round 1
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleRound2}
                    >
                        Round 2
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleRound3}
                    >
                        Round 3
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleRound4}
                    >
                        Round 4
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleRound5}
                    >
                        Round 5
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleRound6}
                    >
                        Round 6
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleRound7}
                    >
                        Round 7
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleRound8}
                    >
                        Round 8
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleRound9}
                    >
                        Round 9
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleRound10}
                    >
                        Round 10
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onUpdatePresaleToEnd}
                    >
                        End Presale
                    </button>
                </div>
            </div>

            {/* Withdraw Section */}
            <div>
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3" style={{ fontFamily: 'Manrope' }}>Withdraw</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={onWithdrawSol}
                    >
                        Withdraw SOL
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={() => onWithdrawToken(TOKEN_PUBKEY)}
                    >
                        Withdraw MintToken
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={() => onWithdrawToken(USDT_TOKEN_PUBKEY)}
                    >
                        Withdraw USDT
                    </button>
                    <button
                        className="px-4 py-2.5 bg-gradient-to-r from-[#D19114] to-[#E5A841] hover:from-[#B87A0F] hover:to-[#D19114] text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow"
                        style={{ fontFamily: 'Manrope' }}
                        onClick={() => onWithdrawToken(USDC_TOKEN_PUBKEY)}
                    >
                        Withdraw USDC
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminSection;