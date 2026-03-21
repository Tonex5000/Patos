import ExchangeCard from '../components/home/ExchangeCard';
import Footer from '../components/home/Footer';
import HomeHeader from '../components/home/HomeHeader';

interface Exchange {
    id: string;
    name: string;
    volume24h: string;
    monthlyVolume: string;
    status: 'confirmed' | 'pending';
    confirmationLink?: string;
}

const Listings = () => {
    // All exchanges data - Crypto Exchange Listing Confirmations
    const allExchanges: Exchange[] = [
        {
            id: '1',
            name: 'AzBit',
            volume24h: '$1.5M',
            monthlyVolume: '$45.2M',
            status: 'confirmed',
            confirmationLink: 'https://medium.com/azbit-news/listing-alert-patos-meme-coin-patos-f85af03768d9'
        },
        {
            id: '2',
            name: 'BitStorage',
            volume24h: '$800K',
            monthlyVolume: '$24.0M',
            status: 'confirmed'
        },
        {
            id: '4',
            name: 'DEx-trade',
            volume24h: '$950K',
            monthlyVolume: '$28.5M',
            status: 'confirmed'
        },
        {
            id: '9',
            name: 'BitsPay',
            volume24h: '$1.1M',
            monthlyVolume: '$33.0M',
            status: 'confirmed'
        },
        {
            id: '3',
            name: 'BiFinance',
            volume24h: '$1.2M',
            monthlyVolume: '$36.0M',
            status: 'pending'
        },
        {
            id: '5',
            name: 'Ascnedex',
            volume24h: '$600K',
            monthlyVolume: '$18.0M',
            status: 'pending'
        },
        {
            id: '6',
            name: 'XT.com',
            volume24h: '$3.2M',
            monthlyVolume: '$96.0M',
            status: 'pending'
        },
        {
            id: '7',
            name: 'LBANK',
            volume24h: '$2.8M',
            monthlyVolume: '$84.0M',
            status: 'pending'
        },
        {
            id: '8',
            name: 'MEXC',
            volume24h: '$4.1M',
            monthlyVolume: '$123.0M',
            status: 'pending'
        }
    ];

    const moveToPresaleSection = () => {
        // Will scroll to presale section on home page
    };

    const moveToAboutSection = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const moveToTokenomicsSection = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const moveToRoadmapSection = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full min-h-screen bg-white">
            <HomeHeader
                onAboutClick={moveToAboutSection}
                onTokenomicsClick={moveToTokenomicsSection}
                onRoadmapClick={moveToRoadmapSection}
            />

            {/* Header Section */}
            <div className="px-[10px] md:px-[95.5px] max-md:px-2 max-md:box-border py-20 max-md:py-10">
                <div className="flex flex-col items-center justify-center mb-12 max-md:mb-8">
                    <h1
                        className="text-[54px] max-md:text-[40px] font-bold text-center mb-4"
                        style={{ fontFamily: 'ArchivoBlack' }}
                    >
                        Crypto Exchange Listing Confirmations
                    </h1>
                    <p
                        className="text-gray-600 text-center text-lg max-md:text-base"
                        style={{ fontFamily: 'Manrope' }}
                    >
                        Track confirmed and upcoming listings of $PATOS across major crypto exchanges
                    </p>
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg px-6 py-3 max-w-2xl">
                        <p
                            className="text-blue-700 text-center text-sm font-medium"
                            style={{ fontFamily: 'Manrope' }}
                        >
                            ℹ️ CEX listings data represents 30 days before confirmation of listing was made.
                        </p>
                    </div>
                </div>

                {/* Exchange Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {allExchanges.map((exchange) => (
                        <ExchangeCard
                            key={exchange.id}
                            exchangeName={exchange.name}
                            volume24h={exchange.volume24h}
                            monthlyVolume={exchange.monthlyVolume}
                            status={exchange.status}
                            confirmationLink={exchange.confirmationLink}
                        />
                    ))}
                </div>
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

export default Listings;