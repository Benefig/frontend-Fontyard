import Card from "@/components/Card";
import Link from "next/link";

export default async function VenueCatalog({venuesJson} : {venuesJson:Promise<VenueJson>}) {
    const venueJsonReady = await Promise.resolve(venuesJson);
    return (
        <div className="text-center">
            Explore {venueJsonReady.count} venues in our catalog
            <div className="m-5 flex flex-row justify-around content-around flex-wrap">
                    {
                        venueJsonReady.data.map((venueItem:VenueItem) => (
                            <Link href={`/venue/${venueItem.id}`} key={venueItem.id} 
                            className="block w-[100%] sm:w-[50%] lg:w-[25%]
                            p-2 sm:p-4 lg:p-8">
                                <Card venueName={venueItem.name} imgSrc={venueItem.picture}/>
                            </Link>
                        ))
                    }
            </div>
        </div>
    );
}