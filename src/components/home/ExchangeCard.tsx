import { ExternalLink } from 'lucide-react';

interface ExchangeCardProps {
    exchangeName: string;
    volume24h: string;
    monthlyVolume: string;
    status: 'confirmed' | 'pending';
    confirmationLink?: string;
}

const ExchangeCard = ({ exchangeName, volume24h, monthlyVolume, status, confirmationLink }: ExchangeCardProps) => {
    const statusColor = status === 'confirmed' ? 'bg-green-500' : 'bg-orange-400';
    const statusLabel = status === 'confirmed' ? 'Confirmed' : 'Pending';

    return (
        <div className="relative bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            {/* Status Badge */}
            <div className={`absolute top-3 right-3 ${statusColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                {statusLabel}
            </div>

            {/* Exchange Name */}
            <div className="mb-6 pr-24">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'ArchivoBlack' }}>
                    {exchangeName}
                </h3>
            </div>

            {/* Card Content */}
            <div className="space-y-4">
                {/* 24h Volume */}
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm font-medium" style={{ fontFamily: 'Manrope' }}>
                        24h Volume
                    </span>
                    <span className="text-gray-900 font-semibold" style={{ fontFamily: 'Manrope' }}>
                        {volume24h}
                    </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200" />

                {/* Monthly Trading Volume */}
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm font-medium" style={{ fontFamily: 'Manrope' }}>
                        Monthly Volume
                    </span>
                    <span className="text-gray-900 font-semibold" style={{ fontFamily: 'Manrope' }}>
                        {monthlyVolume}
                    </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200" />

                {/* Confirmation Link - Only show for confirmed exchanges */}
                {status === 'confirmed' && confirmationLink && (
                    <div className="pt-2">
                        <a
                            href={confirmationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
                            style={{ fontFamily: 'Manrope' }}
                        >
                            View Confirmation
                            <ExternalLink size={14} />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExchangeCard;
