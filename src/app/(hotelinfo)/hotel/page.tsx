import CardPanel from "@/components/CardPanel";
import getHotels from "@/libs/getHotels";
import HotelCatalog from "@/components/HotelCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Hotel() {
    const hotels = getHotels();

    return(
        <main className="pb-10">
            <h1 className="text-2xl font-bold text-center">Select Your Soulmate Hotel</h1>
            {/*<CardPanel/>*/}
            <Suspense fallback={<p className="text-center">Loading ... <LinearProgress/></p>}>
               <HotelCatalog hotelsJson={hotels}/> 
            </Suspense>
            

            {/*
            <hr className="my-10"/>
            <h1 className="text-xl font-medium text-center">Try Client-side Card Panel</h1>
            <CardPanel/>
            */}
        </main>
    );
}