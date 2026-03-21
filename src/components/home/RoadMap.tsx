import { useState } from 'react';

const RoadMap = () => {
    const [showAllStages, setShowAllStages] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const stages = [
        {
            number: 1,
            title: "Stage 1",
            description: "Incubation stage and collections to/from project creator, private investors, & developers. Team training and organization.",
            image: "/img/home/roadmap-1.png"
        },
        {
            number: 2,
            title: "Stage 2",
            description: "Presale Launch, project development begins with the hired team of meme coin industry veterans. Marketing Starts.",
            image: "/img/home/roadmap-2.png"
        },
        {
            number: 3,
            title: "Stage 3",
            description: "Increased Marketing Push and brand value development.",
            image: "/img/home/roadmap-3.png"
        },
        {
            number: 4,
            title: "Stage 4",
            description: "The initial confirmations of Crypto exchange listings begin—team AMAs and interviews with major media outlets to discuss the project (marketing/brand value). Each CEX listing should increase the liquidity pool potential for $PATOS (after token's launch).",
            image: "/img/home/roadmap-4.png"
        },
        {
            number: 5,
            title: "Stage 5",
            description: "Scaling up of confirmed CEX listings. Multiple per week. More CEX listings means more potential incoming streams from other liquidity pools into the $PATOS liquidity pool.",
            image: "/img/home/roadmap-5.png"
        },
        {
            number: 6,
            title: "Stage 6",
            description: "Patos Application development and continued scaling of CEX listing confirmations. Continued PR developments to give investors and potential investors insights into Patos' progress.",
            image: "/img/home/roadmap-6.png"
        },
        {
            number: 7,
            title: "Stage 7",
            description: "Patos Application completion. Product launch.",
            image: "/img/home/roadmap-7.png"
        },
        {
            number: 8,
            title: "Stage 8",
            description: "Continued CEX listings. Amplified marketing, which will include physical products to be given out in the streets of major cities.",
            image: "/img/home/roadmap-8.png"
        },
        {
            number: 9,
            title: "Stage 9",
            description: "Relationship building with the largest crypto exchanges and media outlets to organize liquidity pools, market-making needs, etc, for launch.",
            image: "/img/home/roadmap-9.png"
        },
        {
            number: 10,
            title: "Stage 10",
            description: "Maximize marketing before launch so that Patos Meme Coin is seen everywhere, including its launch date on crypto exchanges, to generate the highest possible synergy for opening-day trade volumes and liquidity pool value; aiming to fly to the top ranks of Solana's meme coins (by TV & Liquidity). If done, the $PATOS token value should also fly high.",
            image: "/img/home/roadmap-10.png"
        }
    ];

    const displayedStages = showAllStages ? stages : stages.slice(0, 4);

    return (
        <div className="mt-20 md:px-[95.5px] max-md:px-4 max-md:mt-10 max-md:box-border max-md:w-full max-md:max-w-full">
            <div className="text-[54px] flex items-center justify-center mb-7 max-md:text-[40px] max-md:px-2 luckiest-text text-gray-800" style={{ fontFamily: 'ArchivoBlack' }}>
                ROADMAP
            </div>
            
            {/* mobile mode */}
            <div className="md:hidden py-10 text-gray-800" style={{ fontFamily: 'Manrope' }}>
                {displayedStages.map((stage, index) => (
                    <div key={stage.number} className={`border-l-4 border-gray-600 border-dotted relative ${index > 0 ? 'pt-10' : ''}`}>
                        <div className="absolute min-w-6 min-h-6 bg-[#FECE7A] rounded-full flex items-center justify-center -left-0.5 -translate-x-1/2 top-1/2 -translate-y-1/2">
                            <div className="rounded-full min-w-4 min-h-4 bg-[#0C3A09]"></div>
                        </div>
                        <div className="pl-5 flex items-start w-full gap-3">
                            <img 
                                src={stage.image} 
                                className="md:w-[180px] max-md:w-[30%] cursor-pointer hover:opacity-90 transition-opacity" 
                                alt={stage.title}
                                onClick={() => setModalImage(stage.image)}
                            />
                            <div className="flex flex-col gap-3">
                                <div className="text-xl font-bold">
                                    {stage.title}
                                </div>
                                <div className="text-base">
                                    {stage.description}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {!showAllStages && (
                    <div className="flex justify-center mt-10 mb-4">
                        <button
                            onClick={() => setShowAllStages(true)}
                            className="group relative px-8 py-4 bg-gradient-to-r from-[#E5A841] to-[#FECE7A] text-white rounded-xl font-bold text-base transition-all duration-300 transform hover:-translate-y-0.5 border-2 border-transparent hover:border-[#FECE7A]"
                            style={{ fontFamily: 'Manrope-Bold' }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Full Roadmap - All 10 Stages
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D19114] to-[#E5A841] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </button>
                    </div>
                )}

                {/* CEX Listing Debut - Special Roadmap */}
                {showAllStages && (
                    <div className="border-l-4 border-gray-600 border-dotted relative pt-10 mt-10">
                        <div className="absolute min-w-6 min-h-6 bg-[#FECE7A] rounded-full flex items-center justify-center -left-0.5 -translate-x-1/2 top-1/2 -translate-y-1/2">
                            <div className="rounded-full min-w-4 min-h-4 bg-[#0C3A09]"></div>
                        </div>
                        <div className="pl-5 flex items-start w-full gap-3">
                            <img 
                                src="/img/home/roadmap-11.png" 
                                className="md:w-[180px] max-md:w-[30%] cursor-pointer hover:opacity-90 transition-opacity" 
                                alt="CEX Listing Debut"
                                onClick={() => setModalImage("/img/home/roadmap-11.png")}
                            />
                            <div className="flex flex-col gap-3">
                                <div className="text-xl font-bold">
                                    CEX LISTING DEBUT
                                </div>
                                <div className="text-base">
                                    First ROI Opportunities for Early Investors
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showAllStages && (
                    <div className="flex justify-center mt-10 mb-4">
                        <button
                            onClick={() => setShowAllStages(false)}
                            className="group relative px-8 py-4 bg-gradient-to-r from-[#E5A841] to-[#FECE7A] text-white rounded-xl font-bold text-base transition-all duration-300 transform hover:-translate-y-0.5 border-2 border-transparent hover:border-[#FECE7A]"
                            style={{ fontFamily: 'Manrope-Bold' }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Collapse Roadmap
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D19114] to-[#E5A841] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </button>
                    </div>
                )}
            </div>

            {/* desktop mode */}
            <div className="max-md:hidden py-10" style={{ fontFamily: 'Manrope' }}>
                <div className="relative">
                    {/* Vertical center line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dotted border-gray-600 transform -translate-x-1/2"></div>
                    
                    {displayedStages.map((stage, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div key={stage.number} className={`relative flex items-center mb-16 ${isLeft ? 'justify-start' : 'justify-end'}`}>
                                {/* Timeline circle - always centered on the vertical line */}
                                <div className="absolute left-1/2 -translate-x-1/2 min-w-7 min-h-7 bg-gradient-to-br from-[#FECE7A] to-[#E5A841] rounded-full flex items-center justify-center border-2 border-white z-10">
                                    <div className="rounded-full min-w-3 min-h-3 bg-gray-900"></div>
                                </div>
                                
                                {/* Content */}
                                <div className={`flex items-start gap-6 ${isLeft ? 'pr-8 flex-row-reverse' : 'pl-8'} w-[48%]`}>
                                    <img 
                                        src={stage.image} 
                                        className="w-[180px] rounded-lg flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
                                        alt={stage.title}
                                        onClick={() => setModalImage(stage.image)}
                                    />
                                    <div className={`text-gray-800 flex flex-col gap-3 ${isLeft ? 'text-right' : 'text-left'}`}>
                                        <div className="text-xl font-bold text-gray-900">
                                            {stage.title}
                                        </div>
                                        <div className="text-base text-gray-700 leading-relaxed">
                                            {stage.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {!showAllStages && (
                    <div className="flex justify-center mt-10 mb-4">
                        <button
                            onClick={() => setShowAllStages(true)}
                            className="group relative px-8 py-4 bg-gradient-to-r from-[#E5A841] to-[#FECE7A] text-white rounded-xl font-bold text-base transition-all duration-300 transform hover:-translate-y-0.5 border-2 border-transparent hover:border-[#FECE7A]"
                            style={{ fontFamily: 'Manrope-Bold' }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Full Roadmap - All 10 Stages
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D19114] to-[#E5A841] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </button>
                    </div>
                )}

                {/* CEX Listing Debut - Special Roadmap */}
                {showAllStages && (
                    <div className="relative flex items-center justify-center mt-16">
                        {/* Timeline circle */}
                        {/* <div className="absolute min-w-7 min-h-7 bg-gradient-to-br from-[#FECE7A] to-[#E5A841] rounded-full flex items-center justify-center border-2 border-white z-10 left-1/2 -translate-x-1/2">
                            <div className="rounded-full min-w-3 min-h-3 bg-gray-900"></div>
                        </div> */}
                        
                        {/* Content - Centered */}
                        <div className="flex items-start gap-6 pl-8 w-[48%]">
                            <img 
                                src="/img/home/roadmap-11.png" 
                                className="w-[180px] rounded-lg flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
                                alt="CEX Listing Debut"
                                onClick={() => setModalImage("/img/home/roadmap-11.png")}
                            />
                            <div className="text-gray-800 flex flex-col gap-3 text-left">
                                <div className="text-xl font-bold text-gray-900">
                                    CEX LISTING DEBUT
                                </div>
                                <div className="text-base text-gray-700 leading-relaxed">
                                    First ROI Opportunities for Early Investors
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showAllStages && (
                    <div className="flex justify-center mt-10 mb-4">
                        <button
                            onClick={() => setShowAllStages(false)}
                            className="group relative px-8 py-4 bg-gradient-to-r from-[#E5A841] to-[#FECE7A] text-white rounded-xl font-bold text-base transition-all duration-300 transform hover:-translate-y-0.5 border-2 border-transparent hover:border-[#FECE7A]"
                            style={{ fontFamily: 'Manrope-Bold' }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Collapse Roadmap
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D19114] to-[#E5A841] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </button>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {modalImage && (
                <div 
                    className="fixed inset-0 bg-transparent z-[9999] flex items-center justify-center p-4"
                    onClick={() => setModalImage(null)}
                >
                    <div className="relative max-h-[90vh] w-full md:w-1/2 flex items-center justify-center">
                        <img 
                            src={modalImage} 
                            className="max-w-full max-h-full object-contain rounded-lg cursor-pointer" 
                            alt="Extended roadmap view"
                            onClick={() => setModalImage(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoadMap;
