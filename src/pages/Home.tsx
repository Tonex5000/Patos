import { useRef, useState } from 'react';
import { ArrowUp, Check } from 'lucide-react';
import {
    useWallet,
} from "@solana/wallet-adapter-react";

import HomeHeader from '../components/home/HomeHeader';
import FeaturedInSection from '../components/home/FeaturedInSection';
import AdminSection from '../components/home/AdminSection';
import PresaleSection from '../components/home/PresaleSection';
import ItIsEasySection from '../components/home/ItIsEasySection';
import TokenomicsSection from '../components/home/TokenomicsSection';
import RoadMap from '../components/home/RoadMap';
import Footer from '../components/home/Footer';
import ListedExchangesSection from '../components/home/ListedExchangesSection';
import {
    TOKEN_PUBKEY,
    PRESALE_AUTHORITY
} from "../constants";
import { formatString } from '../utils';

const Home = () => {
    const { publicKey } = useWallet();

    const presaleSectionRef = useRef<HTMLDivElement>(null);
    const aboutSectionRef = useRef<HTMLDivElement>(null);
    const tokenomicsSectionRef = useRef<HTMLDivElement>(null);
    const roadmapSectionRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const moveToPresaleSection = () => {
        presaleSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const moveToAboutSection = () => {
        aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const moveToTokenomicsSection = () => {
        tokenomicsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const moveToRoadmapSection = () => {
        roadmapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(TOKEN_PUBKEY.toBase58()).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        })
    };

    return (
        <div className='home z-3 max-md:overflow-x-hidden max-md:w-full'>
            <div className="scrollup" onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
                <ArrowUp />
            </div>
            <HomeHeader 
                onAboutClick={moveToAboutSection}
                onTokenomicsClick={moveToTokenomicsSection}
                onRoadmapClick={moveToRoadmapSection}
            />
            {
                publicKey && publicKey.toBase58() === PRESALE_AUTHORITY.toBase58() &&
                <AdminSection />
            }
            <div className="presale-section" ref={presaleSectionRef}>
                <PresaleSection />
            </div>
            <div ref={aboutSectionRef} className="xl:px-[105px] lg:px-[50px] max-md:px-2 max-md:box-border flex flex-col md:flex-row md:items-center items-center justify-center gap-10 w-full max-md:w-full max-md:max-w-full py-20 max-md:py-10">
                <div className="w-full md:w-1/2">
                    <div className="xl:text-[78px] lg:text-[58px] md:text-[48px] max-md:text-[38px] uppercase leading-20 text-center max-md:leading-10" style={{ fontFamily: 'Rafale' }}>
                        NEXT MEMECOIN SEASON,
                    </div>
                    <div className="xl:text-[78px] lg:text-[58px] md:text-[48px] max-md:text-[38px] uppercase leading-20 text-center max-md:leading-10" style={{ fontFamily: 'Rafale' }}>
                        $PATOS WILL FLY HIGH
                    </div>
                    <div className="text-[22px] mt-9 text-center" style={{ fontFamily: 'Manrope' }}>
                        Pump All Tokens on Solana
                    </div>
                    <div className="mt-9 w-full flex justify-center items-center">
                        <div
                            className="relative max-md:w-[80%] max-md:max-w-[200px] w-[200px] h-[50px] cursor-pointer"
                            onClick={moveToPresaleSection}
                        >
                            <div className="absolute left-0 top-0 w-full h-full z-10 bg-[#F0D191] hover:bg-[#E5BF76] text-white px-[6px] py-[3px] flex items-center justify-center rounded-sm text-sm font-bold" style={{ fontFamily: 'Manrope' }}>
                                <span className="text-white font-bold text-base max-md:text-sm" style={{ fontFamily: 'Manrope-Bold' }}>JOIN $PATOS</span>
                            </div>
                            <div className="absolute left-1 top-1 px-6 py-3 h-[50px] w-full max-md:w-full bg-[#5A8B2C] z-1 rounded-sm">
                            </div>
                        </div>
                    </div>
                    <div className="mt-9 flex flex-col items-center justify-center gap-2">
                        <div
                            className="text-xl text-center max-md:text-wrap cursor-pointer select-none flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
                            style={{ fontFamily: 'Manrope' }}
                            onClick={handleCopy}
                        >
                            <span className="md:hidden">CA: {formatString(TOKEN_PUBKEY.toBase58(), 11, 10)}</span>
                            <span className="max-md:hidden md:text-sm lg:text-xl">CA: {TOKEN_PUBKEY.toBase58()}</span>
                            {copied && (
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                            )}
                        </div>
                        {copied && (
                            <span className="text-sm text-green-400 font-medium flex items-center gap-1" style={{ fontFamily: 'Manrope' }}>
                                <Check className="w-4 h-4" />
                                Copied to clipboard!
                            </span>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 max-md:flex max-md:items-center max-md:justify-center overflow-hidden">
                    <img 
                        src="/img/home/Comp-1-vmake.png" 
                        className="w-full h-auto"
                        style={{
                            display: 'block',
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            maxWidth: '100%',
                            boxSizing: 'border-box'
                        }}
                        alt="PATOS Token"
                    />
                </div>
            </div>
            <FeaturedInSection />
            <ListedExchangesSection />
            <div ref={tokenomicsSectionRef} className="px-[10px] max-md:px-2 max-md:box-border max-md:w-full max-md:max-w-full">
                <TokenomicsSection />
            </div>
            <div ref={roadmapSectionRef} className="px-[10px] max-md:px-2 max-md:box-border max-md:w-full max-md:max-w-full">
                <RoadMap />
            </div>
            <div className="px-2 md:px-[95.5px] max-md:box-border max-md:w-full max-md:max-w-full">
                <ItIsEasySection moveToPresaleSection={moveToPresaleSection} />
            </div>
            <Footer 
                onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                onAboutClick={moveToAboutSection}
                onTokenomicsClick={moveToTokenomicsSection}
                onRoadmapClick={moveToRoadmapSection}
                onBuyClick={moveToPresaleSection}
            />
        </div>
    );
};

export default Home;