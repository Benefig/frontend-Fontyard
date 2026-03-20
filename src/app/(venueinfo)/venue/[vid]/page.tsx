import Image from "next/image";
import getVenue from "@/libs/getVenue";
import Link from "next/link";

export default async function VenueDetailPage({params} : {params: Promise<{ vid: string }>}) {

    const venueDetail = await getVenue((await params).vid)
    

    /*Mock <Data></Data>*/
    /*
    const mockVenueRepo = new Map();
    mockVenueRepo.set("001", {name: "The Bloom Pavilion", image: "/img/housegreen conservatory.jpg", desc: "Conserve your feelings and sprinkle them through the air as we blend and rejoice in this sparkling sphere."})
    mockVenueRepo.set("002", {name: "Spark Space", image: "/img/passnight club.jpg", desc: "As the nights pass, this sun shines over us equally, like twin stars twinkling through dawn and dusk."})
    mockVenueRepo.set("003", {name: "The Grand Table", image: "/img/holy pavilion.jpg", desc: "Praying without action, crying without tears. For those who have left must keep pushing forward with their calm mind."})
    mockVenueRepo.set("004", {name: "Sand Garden", image: "/img/sand garden.jpg", desc: "A cozy outdoor pavilion where the harshness of the dunes reveals the beauty of every droplet poured into your heart."})
    mockVenueRepo.set("005", {name: "Boatyard Stare", image: "/img/boatyard stare.jpg", desc: "Sail with the waves hoy-hoy, dance upon the wind wee-wee, for all of it lies within our reach-yard stare."})
    */

    return (
        <main className="text-center p-5">
            <h1 className="text-2xl font-semibold">{venueDetail.data.name}</h1>
            <div className="flex flex-row my-5 mx-5">
                <Image src={venueDetail.data.picture} 
                alt = 'Venue Image' width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div className="text-left leading-loose text-md mx-10" >
                    <div>Name: {venueDetail.data.name}</div>
                    <div>Address: {venueDetail.data.address}</div>
                    <div>District: {venueDetail.data.district}</div>
                    <div>Province: {venueDetail.data.province}</div>
                    <div>Postal Code: {venueDetail.data.postalcode}</div>
                    <div>Tel: {venueDetail.data.tel}</div>
                    <div>Daily Rate: {venueDetail.data.dailyrate}</div>
                    
                    <Link href={`/booking?id=${(await params).vid}&name=${venueDetail.data.name}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-sky-300 px-3 py-2 shadow-sm text-white" name="Book Venue">
                            Make Booking
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}

/*export async function generateStaticParams() {
    return [{vid:'001'}, {vid:'002'}, {vid:'003'}];
}*/