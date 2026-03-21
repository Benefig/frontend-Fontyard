import Card from "@/components/Card";
import Link from "next/link";

export default async function HotelCatalog({hotelsJson} : {hotelsJson:Promise<HotelJson>}) {
    const hotelJsonReady = await Promise.resolve(hotelsJson);
    return (
        <div className="text-center">
            Explore {hotelJsonReady.count} hotels in our catalog
            <div className="m-5 flex flex-row justify-around content-around flex-wrap">
                    {
                        hotelJsonReady.data.map((hotelItem:HotelItem) => (
                            <Link href={`/hotel/${hotelItem.id}`} key={hotelItem.id} 
                            className="block w-[100%] sm:w-[50%] lg:w-[25%]
                            p-2 sm:p-4 lg:p-8">
                                <Card hotelName={hotelItem.name} imgSrc={hotelItem.picture}/>
                            </Link>
                        ))
                    }
            </div>
        </div>
    );
}