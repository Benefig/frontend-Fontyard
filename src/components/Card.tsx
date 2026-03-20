'use client'

import { useState } from "react";
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Card( {venueName, imgSrc, venueDesc, onCompare} : 
    {venueName:string, imgSrc:string, venueDesc?:string, onCompare?:Function} ) {
    const [rating, setRating] = useState<number | null>(0);
    return (
        <InteractiveCard contentName = {venueName}>
            <div className = 'w-full h-[60%] relative rounded-t-lg'>
                <Image src = {imgSrc}
                alt = 'Venue Picture'
                fill = {true}
                className = 'object-cover rounded-t-lg'/>
            </div>
            <div className = {'w-full h-[30%] p-[5px]'}>
                <h3 className = 'underline font-bold text-[20px] text-[chocolate]'>{venueName}</h3>
                {venueDesc?<p className = 'text-[14px] font-serif text-[darkgreen]'>{venueDesc}</p> : ''}
            </div>
            {
                onCompare? <Rating id={venueName + " Rating"} name={venueName + " Rating"} data-testid={venueName + " Rating"} defaultValue={0}
                onClick={(e) => e.stopPropagation()}
                onChange={(e, newValue) => {setRating(newValue); onCompare(venueName, newValue ?? 0);}}/> : ''
            }
        </InteractiveCard>
    );
}