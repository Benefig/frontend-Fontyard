import Image from "next/image";
import Link from "next/link";
import getHotel from "@/libs/getHotel";
import HotelBookingPanel from "@/components/HotelBookingPanel";

export default async function HotelDetailPage({ params }: { params: Promise<{ hid: string }> }) {
    const { hid } = await params;
    const { data: hotel } = await getHotel(hid);

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <Link href="/hotel" className="text-sm text-green-700 hover:underline mb-6 inline-block">
                ← กลับไปรายการโรงแรม
            </Link>

            <div className="relative w-full h-[50vh] rounded-2xl overflow-hidden mb-8">
                <Image
                    src={hotel.picture}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-8">{hotel.name}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                    <div className="text-gray-600">
                        📍 {hotel.address}, {hotel.district}, {hotel.province} {hotel.postalcode}
                    </div>
                    {hotel.region && (
                        <div className="text-gray-600">🌏 {hotel.region}</div>
                    )}
                    <div className="text-gray-600">
                        📞 <a href={`tel:${hotel.tel}`} className="hover:underline">{hotel.tel}</a>
                    </div>
                    <div className="text-2xl font-bold text-amber-500 mt-2">
                        ฿{hotel.dailyrate.toLocaleString()}
                        <span className="text-base font-normal text-gray-400 ml-1">/ คืน</span>
                    </div>
                </div>

                <HotelBookingPanel hotelId={hid} hotelName={hotel.name} />
            </div>
        </main>
    );
}
