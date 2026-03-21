'use client'

import {useReducer, useRef, useEffect, useState} from "react";
import Card from "@/components/Card";
import Link from "next/link";
import getHotels from "@/libs/getHotels";

export default function CardPanel() {

    const [hotelResponse, setHotelResponse] = useState<HotelJson | null>(null);

    useEffect (() => {
        const fetchData = async () => {
            const hotels = await getHotels();
            setHotelResponse(hotels);
        }
        fetchData();
    }, []);

    /*
    const countRef = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);
    */

    const compareReducer = (compareList:Map<string, number>, action:{type:string, hotelName:string, rating:number}) => {
        switch(action.type) {
            case 'add': {
                const newMap = new Map(compareList);
                newMap.set(action.hotelName, action.rating);
                return newMap;
            }
            case 'remove': {
                const newMap = new Map(compareList);
                newMap.delete(action.hotelName);
                return newMap;
            }
            default: return compareList;
        }
    }

    const initialMap = new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0],
        /*
        ["Sand Garden", 0],
        ["Boatyard Stare", 0]
        */
    ]);

    const [compareList, dispatchCompare] =useReducer(compareReducer, initialMap);

    /*Mock Data*/
    /*
    const mockHotelRepo = [
        {hid: "001", name: "The Bloom Pavilion", image: "/img/housegreen conservatory.jpg", desc: "Conserve your feelings and sprinkle them through the air as we blend and rejoice in this sparkling sphere."},
        {hid: "002", name: "Spark Space", image: "/img/passnight club.jpg", desc: "As the nights pass, this sun shines over us equally, like twin stars twinkling through dawn and dusk."},
        {hid: "003", name: "The Grand Table", image: "/img/holy pavilion.jpg", desc: "Praying without action, crying without tears. For those who have left must keep pushing forward with their calm mind."},
        {hid: "004", name: "Sand Garden", image: "/img/sand garden.jpg", desc: "A cozy outdoor pavilion where the harshness of the dunes reveals the beauty of every droplet poured into your heart."},
        {hid: "005", name: "Boatyard Stare", image: "/img/boatyard stare.jpg", desc: "Sail with the waves hoy-hoy, dance upon the wind wee-wee, for all of it lies within our reach-yard stare."}
    ]
    */

    if(!hotelResponse) return(<p className="text-center">Card Panel is Loading ...</p>)

    return(
        <div>
            <div className="m-5 flex flex-row gap-6 justify-around">
                {
                    hotelResponse.data.map((hotelItem:HotelItem) => (
                        <Link href={`/hotel/${hotelItem.id}`} key={hotelItem.id} className="w-1/5">
                            <Card hotelName={hotelItem.name} imgSrc={hotelItem.picture}
                            onCompare={(hotel:string, rating:number) => dispatchCompare({type:'add', hotelName:hotel, rating:rating})}/>
                        </Link>
                    ))
                }
            </div>
            <div className="w-full text-xl font-semibold pl-10 pb-2">Hotel List with Ratings: {compareList.size}</div>
            {Array.from(compareList.entries()).map(([hotel, rating]) => (<div key={hotel} data-testid={hotel}
            className="pl-10"
            onClick={() => dispatchCompare({ type: "remove", hotelName: hotel, rating: rating })}>
                {hotel} : {rating}
            </div>
            ))}
            
            {/*
            <button className="block rounded-md bg-sky-600 hover:bg-sky-300 px-3 py-2 shadow-sm text-white ml-10" name="Book Hotel"
            onClick={() => {countRef.current = countRef.current+1; alert(countRef.current)}}>
                Count with Ref
            </button>

            <input type="text" placeholder="Plese fill" className="block text-gray-900 text-sm rounded-lg
            p-2 m-2 bg-purple-50 ring-1 ring-inset ring-purple-400 
            focus:outline-none focus:bg-purple-200 focus:ring-2"
            ref={inputRef}/>
            <button className="block rounded-md bg-sky-600 hover:bg-sky-300 px-3 py-2 shadow-sm text-white ml-10" name="Book Hotel"
            onClick={() => {if(inputRef.current != null) inputRef.current.focus()}}>
                Focus Input
            </button>
            */}
        </div>
    );
}