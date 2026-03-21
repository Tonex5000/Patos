import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import {
    TOKEN_PUBKEY,
} from "../../constants";
import { formatString } from '../../utils';

const TokenomicsSection = () => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(TOKEN_PUBKEY.toBase58()).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        })
    };

    return (
        <div className="mt-20 md:px-[95.5px] max-md:mt-10 px-2 max-md:box-border max-md:w-full max-md:max-w-full">
            {/* <div className="text-[54px] flex items-center justify-center w-full max-md:text-[40px] luckiest-text max-md:px-2 text-gray-900 mb-6" style={{ fontFamily: 'ArchivoBlack' }}>
                TOKENOMICS
            </div> */}
            <div className="flex items-center justify-center py-6 max-md:px-2">
                <div className="bg-gradient-to-r from-[#FECE7A]/10 to-[#E5A841]/10 border border-[#FECE7A]/30 rounded-full px-8 py-3 text-gray-900 text-[23px] max-md:text-center max-md:text-base max-md:px-4 max-md:break-words font-semibold shadow-sm">
                    Total Token Supply: 232,323,232,232
                </div>
            </div>
            <div className="flex items-center w-full max-md:flex-col-reverse max-md:gap-10">
                <div className="relative w-1/2 max-md:w-full flex flex-col items-center justify-center md:p-10">
                    <img src="/img/home/3c-removebg-preview.png" className="w-[90%] rounded-lg max-md:w-[90%] z-10" />
                    <div className='flex flex-col items-center justify-center w-full gap-2 mt-4'>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 text-[18px] flex items-center justify-between w-[80%] max-md:w-full max-md:px-3 z-10 hover:border-[#E5A841] transition-all group">
                            <span className="text-sm text-center max-md:text-sm w-[90%] min-[1532px]:hidden break-all text-gray-700 font-medium" style={{ fontFamily: 'Manrope' }}>{formatString(TOKEN_PUBKEY.toBase58(), 11, 10)}</span>
                            <span className="text-sm text-center max-md:text-sm w-[90%] max-[1532px]:hidden break-all text-gray-700 font-medium" style={{ fontFamily: 'Manrope' }}>{TOKEN_PUBKEY.toBase58()}</span>
                            {copied ? (
                                <Check className='cursor-pointer text-green-600 flex-shrink-0' onClick={handleCopy} />
                            ) : (
                                <Copy className='cursor-pointer text-gray-500 group-hover:text-gray-700 flex-shrink-0 transition-colors' onClick={handleCopy} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 max-md:w-full max-md:flex max-md:items-center max-md:justify-center">
                    <img src="/img/home/ch-removebg.png" className="w-full max-md:w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default TokenomicsSection;