import Image from "next/image";
import Link from "next/link";
import getHotel from "@/libs/getHotel";
import HotelBookingPanel from "@/components/HotelBookingPanel";
import StarRating from "./StarRating";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function HotelDetailPage({ params }: { params: Promise<{ hid: string }> }) {
    const { hid } = await params;
    const { data: hotel } = await getHotel(hid);
    const session = await getServerSession(authOptions);

    // Calculate average rating
    const avgRating = hotel.ratings && hotel.ratings.length > 0
        ? (hotel.ratings.reduce((acc: number, r: {score: number}) => acc + r.score, 0) / hotel.ratings.length).toFixed(1)
        : null;

    // Find the user's specific rating if logged in
    const userRatingItem = session?.user && hotel.ratings 
        ? hotel.ratings.find((r: {user: string}) => r.user === session.user._id)
        : null;
    const userRatingScore = userRatingItem ? userRatingItem.score : 0;

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

            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">{hotel.name}</h1>
                {avgRating && (
                    <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                        <span className="text-amber-500 text-lg">★</span>
                        <span className="text-lg font-bold text-amber-600">{avgRating}</span>
                        <span className="text-sm font-normal text-amber-500/80">({hotel.ratings?.length} รีวิว)</span>
                    </div>
                 )}
            </div>

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

                    {session && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">ให้คะแนนโรงแรมนี้</h3>
                            <StarRating hotelId={hid} initialRating={userRatingScore} />
                        </div>
                    )}
                </div>

                <HotelBookingPanel hotelId={hid} hotelName={hotel.name} />
            </div>
        </main>
    );
}
