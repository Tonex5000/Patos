import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
    return (
        <div className="w-full bg-[#f6f6f6] min-h-screen">
            <div className="px-[10px]">
                {/* header */}
                <div className="w-full py-[10px] md:px-[105px] max-md:px-2">
                    <div className="z-[999] relative">
                        <div className="transition duration-300">
                            <div className="flex items-center justify-between w-full md:flex-row max-md:flex-col max-md:items-center max-md:gap-4">
                                <div className="max-md:flex max-md:w-full max-md:justify-between max-md:items-center">
                                    <Link to="/" className="cursor-pointer">
                                        <img src="/img/home/header-title.png" className="md:h-[64px] max-md:w-[40%] max-md:h-auto" />
                                    </Link>
                                    <Link 
                                        to="/" 
                                        className="md:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E5A841] to-[#FECE7A] hover:from-[#D19114] hover:to-[#E5A841] text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        <span className="text-sm font-medium" style={{ fontFamily: 'Manrope' }}>Back</span>
                                    </Link>
                                </div>
                                <Link 
                                    to="/" 
                                    className="max-md:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E5A841] to-[#FECE7A] hover:from-[#D19114] hover:to-[#E5A841] text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span className="text-sm font-medium" style={{ fontFamily: 'Manrope' }}>Back to Home</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* body */}
                <div className="base-page-content max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-12 max-md:px-4">
                    <h1 className="base-page-title text-4xl md:text-5xl font-bold text-gray-800 mb-8" style={{ fontFamily: 'ArchivoBlack' }}>
                        Terms of Service
                    </h1>
                    <div className="terms-content">
                        <section className="terms-section mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Manrope' }}>
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Manrope' }}>
                                By accessing and using PATOS, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>
                        <section className="terms-section mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Manrope' }}>
                                2. Eligibility
                            </h2>
                            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Manrope' }}>
                                You must be at least 18 years old to use this service. By using PATOS, you represent and warrant that you are of legal age in your jurisdiction and have the legal capacity to enter into these terms.
                            </p>
                        </section>
                        <section className="terms-section mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Manrope' }}>
                                3. Use of Service
                            </h2>
                            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Manrope' }}>
                                You agree to use the service only for lawful purposes and in accordance with these Terms. You agree not to use the service in any way that could damage, disable, or impair the service or interfere with any other party's use of the service.
                            </p>
                        </section>
                        <section className="terms-section mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Manrope' }}>
                                4. Risks
                            </h2>
                            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Manrope' }}>
                                Cryptocurrency investments carry significant risk. Prices can be extremely volatile and you may lose your entire investment. PATOS does not guarantee any returns or profits. You should only invest what you can afford to lose and should conduct your own research (DYOR) before making any investment decisions.
                            </p>
                        </section>
                        <section className="terms-section mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Manrope' }}>
                                5. Limitation of Liability
                            </h2>
                            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Manrope' }}>
                                PATOS is not responsible for any losses, damages, or claims arising from your use of the service, including but not limited to investment losses, technical failures, or security breaches. We provide the service 'as is' without warranties of any kind.
                            </p>
                        </section>
                        <section className="terms-section mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Manrope' }}>
                                6. Changes to Terms
                            </h2>
                            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Manrope' }}>
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes are posted constitutes acceptance of the modified terms.
                            </p>
                        </section>
                        <section className="terms-section mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Manrope' }}>
                                7. Contact
                            </h2>
                            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Manrope' }}>
                                For questions about these terms, please contact us through our official Telegram channel at{' '}
                                <a 
                                    href="https://t.me/patosmemecoin" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#FECE7A] hover:text-[#E5A841] underline transition-colors"
                                >
                                    https://t.me/patosmemecoin
                                </a>
                                {' '}or visit our website.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
