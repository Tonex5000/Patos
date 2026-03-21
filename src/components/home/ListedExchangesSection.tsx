import { useNavigate } from 'react-router-dom';
import ExchangeCard from './ExchangeCard';

interface Exchange {
    id: string;
    name: string;
    volume24h: string;
    monthlyVolume: string;
    status: 'confirmed' | 'pending';
    confirmationLink?: string;
}

const ListedExchangesSection = () => {
    const navigate = useNavigate();

    // Featured exchanges for home page
    const exchanges: Exchange[] = [
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
            id: '5',
            name: 'BitsPay',
            volume24h: '$1.1M',
            monthlyVolume: '$33.0M',
            status: 'confirmed'
        }
    ];

    const handleViewAll = () => {
        navigate('/listings');
    };

    return (
        <div className="w-full px-[10px] md:px-[95.5px] max-md:px-2 max-md:box-border py-20 max-md:py-10">
            {/* Section Title */}
            <div className="flex items-center justify-center mb-12 max-md:mb-8">
                <h2
                    className="text-[54px] max-md:text-[40px] font-bold text-center"
                    style={{ fontFamily: 'ArchivoBlack' }}
                >
                    Listed Exchanges
                </h2>
            </div>

            {/* Exchange Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {exchanges.map((exchange) => (
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

            {/* View All Button */}
            <div className="flex items-center justify-center mt-10">
                <div
                    className="relative max-md:w-[80%] max-md:max-w-[250px] w-[280px] h-[50px] cursor-pointer"
                    onClick={handleViewAll}
                >
                    <div
                        className="absolute left-0 top-0 w-full h-full z-10 bg-[#F0D191] hover:bg-[#E5BF76] text-white px-[6px] py-[3px] flex items-center justify-center rounded-sm text-sm font-bold transition-colors"
                        style={{ fontFamily: 'Manrope' }}
                    >
                        <span className="text-white font-bold text-base max-md:text-sm" style={{ fontFamily: 'Manrope-Bold' }}>
                            VIEW ALL LISTINGS
                        </span>
                    </div>
                    <div className="absolute left-1 top-1 px-6 py-3 h-[50px] w-full max-md:w-full bg-[#5A8B2C] z-1 rounded-sm" />
                </div>
            </div>
        </div>
    );
};

export default ListedExchangesSection;
