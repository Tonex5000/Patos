import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface HomeHeaderProps {
    onAboutClick?: () => void;
    onTokenomicsClick?: () => void;
    onRoadmapClick?: () => void;
}

const HomeHeader = ({ onAboutClick, onTokenomicsClick, onRoadmapClick }: HomeHeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (callback?: () => void) => {
        if (callback) {
            callback();
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="w-full pt-5 px-4 md:px-6 lg:px-10 xl:px-[105px] max-md:px-2">
            <div className="z-[999] relative">
                <div className="transition duration-300">
                    <div className="flex items-center justify-between w-full md:flex-row flex-wrap max-md:flex-col max-md:items-center max-md:gap-4">
                        <div className="max-md:flex max-md:w-full max-md:justify-between max-md:items-center md:w-1/3 flex-shrink-0">
                            <Link to="https://patosmemecoin.com" target="_self" rel="noopener noreferrer">
                                <img src="/img/home/header-title.png" className="md:h-[64px] max-md:w-[40%] max-md:h-auto cursor-pointer" />
                            </Link>
                            <span
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 cursor-pointer"
                                aria-label="Toggle menu"
                            >
                                <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 bg-[#FECE7A]!' : ''}`}></span>
                                <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2  bg-[#FECE7A]!' : ''}`}></span>
                            </span>
                        </div>
                        <nav className={`flex items-center justify-center gap-2 md:gap-2 lg:gap-4 xl:gap-6 md:flex-1 md:min-w-0 md:justify-center md:flex max-md:fixed max-md:top-0 max-md:left-0 max-md:w-full max-md:h-screen max-md:bg-black max-md:bg-opacity-95 max-md:flex-col max-md:justify-center max-md:gap-8 max-md:z-40 max-md:transition-transform max-md:duration-300 max-md:ease-in-out ${isMenuOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'} ${!isMenuOpen ? 'max-md:pointer-events-none' : ''}`}>
                            <span
                                onClick={() => handleNavClick(onAboutClick)}
                                className="text-gray-700 hover:text-[#FECE7A] transition-colors flex items-center gap-1 md:gap-1.5 lg:gap-2 py-1 cursor-pointer text-xs md:text-sm lg:text-base whitespace-nowrap max-md:text-white/70 max-md:hover:text-[#FECE7A] group"
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <span className="nav-link-icon text-gray-600 group-hover:text-[#FECE7A] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 max-md:w-6 max-md:h-6">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                                        <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                        <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                    </svg>
                                </span>
                                About
                            </span>
                            <span
                                onClick={() => handleNavClick(onTokenomicsClick)}
                                className="text-gray-700 hover:text-[#FECE7A] transition-colors flex items-center gap-1 md:gap-1.5 lg:gap-2 py-1 cursor-pointer text-xs md:text-sm lg:text-base whitespace-nowrap max-md:text-white/70 max-md:hover:text-[#FECE7A] group"
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <span className="nav-link-icon text-gray-600 group-hover:text-[#FECE7A] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 max-md:w-6 max-md:h-6">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" fill="currentColor"></path>
                                    </svg>
                                </span>
                                Tokenomics
                            </span>
                            <span
                                onClick={() => handleNavClick(onRoadmapClick)}
                                className="text-gray-700 hover:text-[#FECE7A] transition-colors flex items-center gap-1 md:gap-1.5 lg:gap-2 py-1 cursor-pointer text-xs md:text-sm lg:text-base whitespace-nowrap max-md:text-white/70 max-md:hover:text-[#FECE7A] group"
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <span className="nav-link-icon text-gray-600 group-hover:text-[#FECE7A] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 max-md:w-6 max-md:h-6">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                                Roadmap
                            </span>
                            <div className="max-md:flex md:hidden items-center justify-center gap-6 mt-4">
                                <Link to="https://reddit.com/r/PatosMemecoin" target='_blank' rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="w-8 h-8 text-white hover:text-[#FECE7A] transition-colors" viewBox="0 0 24 24">
                                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" fill="currentColor" />
                                    </svg>
                                </Link>
                                <Link to="https://x.com/mtbc_fun" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="w-8 h-8 text-white hover:text-[#FECE7A] transition-colors" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
                                    </svg>
                                </Link>
                                <Link to="https://www.youtube.com/@PatosMemecoin" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="w-8 h-8 text-white hover:text-[#FECE7A] transition-colors" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor" />
                                    </svg>
                                </Link>
                                <Link to="https://t.me/patosmemecoin" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="w-8 h-8 text-white hover:text-[#FECE7A] transition-colors" viewBox="0 0 24 24">
                                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="max-md:flex md:hidden items-center justify-center mt-4 w-full">
                                <div className="w-full max-w-[280px] flex justify-center">
                                    <WalletMultiButton
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: '#fff',
                                            padding: '10px',
                                            width: '100%',
                                            height: '40px',
                                            border: '1px solid #fff',
                                            borderRadius: '8px',
                                            fontFamily: 'Manrope',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>
                            </div>
                        </nav>
                        <div className="flex items-center justify-end gap-2 md:gap-2 lg:gap-3 xl:gap-4 md:flex-shrink-0 md:min-w-0 max-md:hidden">
                            <Link to="https://reddit.com/r/PatosMemecoin" target='_blank' rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-[#FECE7A] transition-colors" viewBox="0 0 24 24">
                                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" fill="currentColor" />
                                </svg>
                            </Link>
                            <Link to="https://x.com/mtbc_fun" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-[#FECE7A] transition-colors" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
                                </svg>
                            </Link>
                            <Link to="https://www.youtube.com/@PatosMemecoin" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-[#FECE7A] transition-colors" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor" />
                                </svg>
                            </Link>
                            <Link to="https://t.me/patosmemecoin" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-[#FECE7A] transition-colors" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor" />
                                </svg>
                            </Link>
                            <div className="flex items-center">
                                <WalletMultiButton
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: '#333',
                                        padding: '10px 16px',
                                        height: '40px',
                                        border: '1px solid #333',
                                        borderRadius: '8px',
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                        whiteSpace: 'nowrap'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomeHeader;