'use client'

import { useState, useEffect } from "react";
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';
import { useSession } from "next-auth/react";

export default function Card({hotelName, imgSrc, hotelDesc, onCompare}:{hotelName:string, imgSrc:string, hotelDesc?:string, onCompare?:Function}) {

    const { data: session } = useSession();
    const userId = session?.user?._id ?? "guest";

    const [rating, setRating] = useState<number | null>(0);

    useEffect(() => {
        const saved = localStorage.getItem(`rating-${userId}-${hotelName}`);
        if (saved) setRating(Number(saved));
    }, [hotelName, userId]);

    return (
        <InteractiveCard contentName={hotelName}>
            <div className='w-full h-[60%] relative rounded-t-lg'>
                <Image src={imgSrc} alt='Hotel Picture' fill className='object-cover rounded-t-lg'/>
            </div>

            <div className='w-full h-[30%] p-[5px]'>
                <h3 className='underline font-bold text-[20px] text-[chocolate]'>
                    {hotelName}
                </h3>
                {hotelDesc && (
                    <p className='text-[14px] font-serif text-[darkgreen]'>
                        {hotelDesc}
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
                            `rating-${userId}-${hotelName}`,
                            newValue.toString()
                        );
                    }
                    onCompare?.(hotelName, newValue ?? 0);
                }}
            />
        </InteractiveCard>
    );
}