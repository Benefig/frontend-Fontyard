import CardPanel from "@/components/CardPanel";
import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Venue() {
    const venues = getVenues();

    return(
        <main className="pb-10">
            <h1 className="text-2xl font-bold text-center">Select Your Soulmate Venue</h1>
            {/*<CardPanel/>*/}
            <Suspense fallback={<p className="text-center">Loading ... <LinearProgress/></p>}>
               <VenueCatalog venuesJson={venues}/> 
            </Suspense>
            

            {/*
            <hr className="my-10"/>
            <h1 className="text-xl font-medium text-center">Try Client-side Card Panel</h1>
            <CardPanel/>
            */}
        </main>
    );
}