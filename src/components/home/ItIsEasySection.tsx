interface ItIsEasySectionPropsType {
    moveToPresaleSection: () => void;
}

const ItIsEasySection = ({ moveToPresaleSection }: ItIsEasySectionPropsType) => {
    return (
        <div className="p-[10px] mt-10 max-md:p-2 max-md:box-border flex flex-col gap-[10px] w-full max-md:w-full max-md:max-w-full">
            <div className="w-full flex items-center justify-center text-[30px] max-md:text-xl font-semibold uppercase text-center max-md:px-2 text-gray-800" style={{ fontFamily: 'ArchivoBlack' }}>
                How Can Investors Help Themselves Get a Better ROI?
            </div>
            {/* <div className="w-full flex items-center justify-center text-[80px] uppercase max-md:text-[40px] max-md:px-2 text-gray-800" style={{ fontFamily: 'Manrope' }}>
                It is easy
            </div> */}
            <div className="p-[10px] max-md:p-2 flex items-center justify-center gap-[30px] max-md:flex-col max-md:h-fit max-md:gap-4">
                <div className="w-[60%] max-md:w-full max-md:px-2 text-gray-800 max-md:text-base" style={{ fontFamily: 'Manrope' }}>
                    <div className="mb-4 text-base max-md:text-sm">
                        Based on historical meme coin chart data, Solana meme coin ROI increases when large numbers of investors do this:
                    </div>
                    <div className="space-y-2">
                        <div>
                            <span className="text-[#666699] font-semibold">01 - </span>
                            <span>Buy PATOS</span>
                        </div>
                        <div>
                            <span className="text-[#666699] font-semibold">02 - </span>
                            <span>Share News</span>
                        </div>
                        <div>
                            <span className="text-[#666699] font-semibold">03 - </span>
                            <span>Share Memes</span>
                        </div>
                        <div>
                            <span className="text-[#666699] font-semibold">04 - </span>
                            <span>Share Videos</span>
                        </div>
                        <div>
                            <span className="text-[#666699] font-semibold">05 - </span>
                            <span>Create Discussion in Crypto groups about Patos</span>
                        </div>
                        <div>
                            <span className="text-[#666699] font-semibold">06 - </span>
                            <span>Tweet about Patos</span>
                        </div>
                        <div>
                            <span className="text-[#666699] font-semibold">07 - </span>
                            <span>Gift others a few Patos tokens and tell them do the same; create a bigger market synergy</span>
                        </div>
                    </div>
                </div>
                {/* <div className="w-full h-full md:relative max-md:flex max-md:items-center max-md:justify-center">
                    <img src="/img/home/trump-1.png" className="md:absolute md:h-[120%] max-md:w-[50%] md:left-1/2 md:bottom-0 md:-translate-x-1/2" />
                </div> */}
                <div className="w-full h-full flex items-center justify-center">
                    <img src="/img/home/trump-1.png" className="w-[90%]" />
                </div>
                <div className="w-[60%] max-md:w-full max-md:px-2 text-gray-800 uppercase max-md:text-center" style={{ fontFamily: 'Manrope' }}>
                    <div>After CEX listing the project will be DAO governed and driven.</div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center mt-4 max-md:px-2">
                <div
                    className="relative h-[47px] w-[136px] max-md:w-[80%] max-md:max-w-[200px] cursor-pointer"
                    onClick={moveToPresaleSection}
                >
                    <div className="absolute left-0 top-0 w-full h-full z-10 bg-[#FFBF42] text-white px-[6px] py-[3px] flex items-center justify-center rounded-lg text-[21px] max-md:text-lg font-bold" style={{ fontFamily: 'Manrope-Bold' }}>
                        <span className="text-white">Buy Now</span>
                    </div>
                    <div className="absolute left-1 top-1 px-6 py-3 h-[47px] w-full max-md:w-full bg-[#D19114] z-1 rounded-lg">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItIsEasySection;