import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function Card({
    hotelName,
    imgSrc,
    province,
    dailyrate,
}: {
    hotelName: string;
    imgSrc: string;
    province?: string;
    dailyrate?: number;
}) {
    return (
        <InteractiveCard contentName={hotelName}>
            <div className="w-full h-48 relative">
                <Image
                    src={imgSrc}
                    alt="Hotel Picture"
                    fill
                    className="object-cover rounded-t-lg"
                />
            </div>
            <div className="px-3 pt-3 pb-4 flex flex-col gap-1">
                <h3 className="font-semibold text-[17px] text-gray-800 truncate">{hotelName}</h3>
                {province && (
                    <p className="text-sm text-gray-500">📍 {province}</p>
                )}
                {dailyrate !== undefined && (
                    <p className="text-[15px] font-bold text-amber-500">
                        ฿{dailyrate.toLocaleString()} <span className="font-normal text-gray-400 text-xs">/ คืน</span>
                    </p>
                )}
            </div>
        </InteractiveCard>
    );
}
