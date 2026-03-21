import { Link } from 'react-router-dom';

interface FooterProps {
    onHomeClick?: () => void;
    onAboutClick?: () => void;
    onTokenomicsClick?: () => void;
    onRoadmapClick?: () => void;
    onBuyClick?: () => void;
}

const Footer = ({ onHomeClick, onAboutClick, onTokenomicsClick, onRoadmapClick, onBuyClick }: FooterProps) => {
    return (
        <footer className="footer-section w-full bg-[#f6f6f6] border-t border-[#FECE7A]/20 mt-20 max-md:overflow-x-hidden max-md:w-full max-md:max-w-full">
            <div className="footer-container max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 max-md:px-4 max-md:box-border max-md:w-full max-md:max-w-full">
                <div className="footer-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 max-md:gap-6">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <div className="footer-logo-wrapper relative inline-block mb-4">
                            <img 
                                src="/img/home/header-title.png" 
                                alt="PATOS Token Logo" 
                                className="footer-logo h-12 max-md:h-10 object-contain"
                            />
                            <div className="footer-logo-glow absolute inset-0 bg-[#FECE7A]/20 blur-xl rounded-full"></div>
                        </div>
                        <h3 className="footer-brand-name text-2xl font-bold text-[#FECE7A] mb-2" style={{ fontFamily: 'ArchivoBlack' }}>
                            PATOS
                        </h3>
                        <p className="footer-description text-gray-700 text-sm mb-3" style={{ fontFamily: 'Manrope' }}>
                            PATOS - The first official billionaires meme club. Making Crypto Great Again!
                        </p>
                        <div className="footer-tagline text-gray-700 text-sm font-semibold" style={{ fontFamily: 'Manrope' }}>
                            The meme coin that's making crypto history
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="footer-column">
                        <h4 className="footer-column-title text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2" style={{ fontFamily: 'Manrope' }}>
                            <span className="footer-icon-wrapper text-gray-600">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                            Quick Links
                        </h4>
                        <nav className="footer-nav flex flex-col gap-2">
                            <span 
                                onClick={onHomeClick}
                                className="footer-nav-link text-left text-gray-700 hover:text-[#FECE7A] transition-colors flex items-center gap-2 py-1 cursor-pointer group" 
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <span className="nav-link-icon text-gray-600 group-hover:text-[#FECE7A] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                                Home
                            </span>
                            <span 
                                onClick={onAboutClick}
                                className="footer-nav-link text-left text-gray-700 hover:text-[#FECE7A] transition-colors flex items-center gap-2 py-1 cursor-pointer group" 
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <span className="nav-link-icon text-gray-600 group-hover:text-[#FECE7A] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                                        <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                        <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                    </svg>
                                </span>
                                About
                            </span>
                            <span 
                                onClick={onBuyClick}
                                className="footer-nav-link text-left text-gray-700 hover:text-[#FECE7A] transition-colors flex items-center gap-2 py-1 cursor-pointer group" 
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <span className="nav-link-icon text-gray-600 group-hover:text-[#FECE7A] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                                How to Buy
                            </span>
                            <span 
                                onClick={onTokenomicsClick}
                                className="footer-nav-link text-left text-gray-700 hover:text-[#FECE7A] transition-colors flex items-center gap-2 py-1 cursor-pointer group" 
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <span className="nav-link-icon text-gray-600 group-hover:text-[#FECE7A] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" fill="currentColor"></path>
                                    </svg>
                                </span>
                                Tokenomics
                            </span>
                            <span 
                                onClick={onRoadmapClick}
                                className="footer-nav-link text-left text-gray-700 hover:text-[#FECE7A] transition-colors flex items-center gap-2 py-1 cursor-pointer group" 
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <span className="nav-link-icon text-gray-600 group-hover:text-[#FECE7A] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                                Roadmap
                            </span>
                            <Link 
                                to="/terms"
                                data-discover="true"
                                className="footer-nav-link text-left text-gray-700 hover:text-[#FECE7A]! transition-colors flex items-center gap-2 py-1 cursor-pointer group" 
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <span className="nav-link-icon text-gray-600 group-hover:text-[#FECE7A] transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                                Terms of Service
                            </Link>
                        </nav>
                    </div>

                    {/* Community Column */}
                    <div className="footer-column">
                        <h4 className="footer-column-title text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2" style={{ fontFamily: 'Manrope' }}>
                            <span className="footer-icon-wrapper text-gray-600">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle>
                                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                            Community
                        </h4>
                        <div className="footer-social-grid flex flex-wrap gap-3 mb-6">
                            <Link 
                                to="https://reddit.com/r/PatosMemecoin" 
                                className="footer-social-btn w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-[#FECE7A]/20 text-gray-700 hover:text-[#FECE7A] transition-all duration-300" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Join our Reddit" 
                                title="Reddit"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" fill="currentColor"></path>
                                </svg>
                            </Link>
                            <Link 
                                to="https://x.com/mtbc_fun" 
                                className="footer-social-btn w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-[#FECE7A]/20 text-gray-700 hover:text-[#FECE7A] transition-all duration-300" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Follow us on X" 
                                title="X"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"></path>
                                </svg>
                            </Link>
                            <Link 
                                to="https://www.youtube.com/@PatosMemecoin" 
                                className="footer-social-btn w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-[#FECE7A]/20 text-gray-700 hover:text-[#FECE7A] transition-all duration-300" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Follow us on YouTube" 
                                title="YouTube"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"></path>
                                </svg>
                            </Link>
                            <Link 
                                to="https://t.me/patosmemecoin" 
                                className="footer-social-btn w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-[#FECE7A]/20 text-gray-700 hover:text-[#FECE7A] transition-all duration-300" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Join our Telegram" 
                                title="Telegram"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor"></path>
                                </svg>
                            </Link>
                        </div>
                        <div className="footer-resources flex flex-col gap-2">
                            <Link 
                                to="/whitepaper.pdf" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-resource-btn flex items-center gap-2 text-gray-700 hover:text-[#FECE7A]! transition-colors py-2 group" 
                                style={{ fontFamily: 'Manrope' }}
                            >
                                <div className="resource-btn-icon text-gray-600 group-hover:text-[#FECE7A] transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                                <span>Whitepaper</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom border-t border-white/10 pt-8">
                    <div className="footer-bottom-content text-center">
                        <p className="footer-copyright text-gray-600 text-sm mb-4" style={{ fontFamily: 'Manrope' }}>
                            © 2025 PATOS. All Rights Reserved.
                        </p>
                        <p className="footer-disclaimer text-gray-500 text-xs max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'Manrope' }}>
                            Crypto is risky - prices can go up or down fast, and you could lose your money. In some countries, profits may be taxed, so check your local rules. Nothing here is financial advice - DYOR. PATOS does not guarantee profits. By using this platform, you accept our Terms and Policies.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

