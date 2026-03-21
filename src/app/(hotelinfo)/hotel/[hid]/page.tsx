import Image from "next/image";
import getHotel from "@/libs/getHotel";
import Link from "next/link";

export default async function HotelDetailPage({params} : {params: Promise<{ hid: string }>}) {

    const hotelDetail = await getHotel((await params).hid)
    

    /*Mock <Data></Data>*/
    /*
    const mockHotelRepo = new Map();
    mockHotelRepo.set("001", {name: "The Bloom Pavilion", image: "/img/housegreen conservatory.jpg", desc: "Conserve your feelings and sprinkle them through the air as we blend and rejoice in this sparkling sphere."})
    mockHotelRepo.set("002", {name: "Spark Space", image: "/img/passnight club.jpg", desc: "As the nights pass, this sun shines over us equally, like twin stars twinkling through dawn and dusk."})
    mockHotelRepo.set("003", {name: "The Grand Table", image: "/img/holy pavilion.jpg", desc: "Praying without action, crying without tears. For those who have left must keep pushing forward with their calm mind."})
    mockHotelRepo.set("004", {name: "Sand Garden", image: "/img/sand garden.jpg", desc: "A cozy outdoor pavilion where the harshness of the dunes reveals the beauty of every droplet poured into your heart."})
    mockHotelRepo.set("005", {name: "Boatyard Stare", image: "/img/boatyard stare.jpg", desc: "Sail with the waves hoy-hoy, dance upon the wind wee-wee, for all of it lies within our reach-yard stare."})
    */

    return (
        <main className="text-center p-5">
            <h1 className="text-2xl font-semibold">{hotelDetail.data.name}</h1>
            <div className="flex flex-row my-5 mx-5">
                <Image src={hotelDetail.data.picture} 
                alt = 'Hotel Image' width={0} height={0} sizes="100vw"
                className="rounded-lg w-auto h-[75vh]"/>
                <div className="text-left leading-[2] text-xl mx-10" >
                    <div>Name: {hotelDetail.data.name}</div>
                    <div>Address: {hotelDetail.data.address}</div>
                    <div>District: {hotelDetail.data.district}</div>
                    <div>Province: {hotelDetail.data.province}</div>
                    <div>Postal Code: {hotelDetail.data.postalcode}</div>
                    <div>Region: {hotelDetail.data.region}</div>
                    <div>Tel: {hotelDetail.data.tel}</div>
                    <div>Daily Rate: {hotelDetail.data.dailyrate}</div>
                    
                    <Link href={`/booking?id=${(await params).hid}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-sky-300 px-3 py-2 shadow-sm text-white" name="Book Hotel">
                            Make Booking!
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}

/*export async function generateStaticParams() {
    return [{hid:'001'}, {hid:'002'}, {hid:'003'}];
}*/