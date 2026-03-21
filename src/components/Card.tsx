'use client'

import { useState, useEffect } from "react";
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';
import { useSession } from "next-auth/react";

export default function Card({venueName, imgSrc, venueDesc, onCompare}:{venueName:string, imgSrc:string, venueDesc?:string, onCompare?:Function}) {

    const { data: session } = useSession();
    const userId = session?.user?._id ?? "guest";

    const [rating, setRating] = useState<number | null>(0);

    useEffect(() => {
        const saved = localStorage.getItem(`rating-${userId}-${venueName}`);
        if (saved) setRating(Number(saved));
    }, [venueName, userId]);

    return (
        <InteractiveCard contentName={venueName}>
            <div className='w-full h-[60%] relative rounded-t-lg'>
                <Image src={imgSrc} alt='Venue Picture' fill className='object-cover rounded-t-lg'/>
            </div>

            <div className='w-full h-[30%] p-[5px]'>
                <h3 className='underline font-bold text-[20px] text-[chocolate]'>
                    {venueName}
                </h3>
                {venueDesc && (
                    <p className='text-[14px] font-serif text-[darkgreen]'>
                        {venueDesc}
                    </p>
                )}
            </div>

            <Rating
                value={rating}
                onClick={(e) => e.stopPropagation()}
                onChange={(e, newValue) => {
                    setRating(newValue);
                    if (newValue !== null) {
                        localStorage.setItem(
                            `rating-${userId}-${venueName}`,
                            newValue.toString()
                        );
                    }
                    onCompare?.(venueName, newValue ?? 0);
                }}
            />
        </InteractiveCard>
    );
}