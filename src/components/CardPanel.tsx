'use client'

import {useReducer, useRef, useEffect, useState} from "react";
import Card from "@/components/Card";
import Link from "next/link";
import getVenues from "@/libs/getVenues";

export default function CardPanel() {

    const [venueResponse, setVenueResponse] = useState<VenueJson | null>(null);

    useEffect (() => {
        const fetchData = async () => {
            const venues = await getVenues();
            setVenueResponse(venues);
        }
        fetchData();
    }, []);

    /*
    const countRef = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);
    */

    const compareReducer = (compareList:Map<string, number>, action:{type:string, venueName:string, rating:number}) => {
        switch(action.type) {
            case 'add': {
                const newMap = new Map(compareList);
                newMap.set(action.venueName, action.rating);
                return newMap;
            }
            case 'remove': {
                const newMap = new Map(compareList);
                newMap.delete(action.venueName);
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
    const mockVenueRepo = [
        {vid: "001", name: "The Bloom Pavilion", image: "/img/housegreen conservatory.jpg", desc: "Conserve your feelings and sprinkle them through the air as we blend and rejoice in this sparkling sphere."},
        {vid: "002", name: "Spark Space", image: "/img/passnight club.jpg", desc: "As the nights pass, this sun shines over us equally, like twin stars twinkling through dawn and dusk."},
        {vid: "003", name: "The Grand Table", image: "/img/holy pavilion.jpg", desc: "Praying without action, crying without tears. For those who have left must keep pushing forward with their calm mind."},
        {vid: "004", name: "Sand Garden", image: "/img/sand garden.jpg", desc: "A cozy outdoor pavilion where the harshness of the dunes reveals the beauty of every droplet poured into your heart."},
        {vid: "005", name: "Boatyard Stare", image: "/img/boatyard stare.jpg", desc: "Sail with the waves hoy-hoy, dance upon the wind wee-wee, for all of it lies within our reach-yard stare."}
    ]
    */

    if(!venueResponse) return(<p className="text-center">Card Panel is Loading ...</p>)

    return(
        <div>
            <div className="m-5 flex flex-row gap-6 justify-around">
                {
                    venueResponse.data.map((venueItem:VenueItem) => (
                        <Link href={`/venue/${venueItem.id}`} key={venueItem.id} className="w-1/5">
                            <Card venueName={venueItem.name} imgSrc={venueItem.picture}
                            onCompare={(venue:string, rating:number) => dispatchCompare({type:'add', venueName:venue, rating:rating})}/>
                        </Link>
                    ))
                }
            </div>
            <div className="w-full text-xl font-semibold pl-10 pb-2">Venue List with Ratings: {compareList.size}</div>
            {Array.from(compareList.entries()).map(([venue, rating]) => (<div key={venue} data-testid={venue}
            className="pl-10"
            onClick={() => dispatchCompare({ type: "remove", venueName: venue, rating: rating })}>
                {venue} : {rating}
            </div>
            ))}
            
            {/*
            <button className="block rounded-md bg-sky-600 hover:bg-sky-300 px-3 py-2 shadow-sm text-white ml-10" name="Book Venue"
            onClick={() => {countRef.current = countRef.current+1; alert(countRef.current)}}>
                Count with Ref
            </button>

            <input type="text" placeholder="Plese fill" className="block text-gray-900 text-sm rounded-lg
            p-2 m-2 bg-purple-50 ring-1 ring-inset ring-purple-400 
            focus:outline-none focus:bg-purple-200 focus:ring-2"
            ref={inputRef}/>
            <button className="block rounded-md bg-sky-600 hover:bg-sky-300 px-3 py-2 shadow-sm text-white ml-10" name="Book Venue"
            onClick={() => {if(inputRef.current != null) inputRef.current.focus()}}>
                Focus Input
            </button>
            */}
        </div>
    );
}