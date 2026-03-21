"use client"

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";

export default function BookingList() {

    const venueItems = useAppSelector( (state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
        {
            venueItems.length === 0? <div className="text-xl text-center font-semibold">No Venue Booking</div>:
            venueItems.map((bookingItem: BookingItem) =>(
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
                    key = {bookingItem.venue+bookingItem.bookDate}>
                        <div className="text-xl">{bookingItem.nameLastname}</div>
                        <div className="text-base">Contract: {bookingItem.tel}</div>
                        <div className="text-base">Soulmate Venue: {bookingItem.venue}</div>
                        <div className="text-base">Booking Date: {bookingItem.bookDate}</div>
                        <button className="block rounded-md bg-sky-600 hover:bg-sky-300 px-3 py-2 shadow-sm text-white" name="Book Venue"
                        onClick={() => dispatch(removeBooking(bookingItem))}>
                            Remove from List
                        </button>
                </div>
            ))
        }
        </>
    );
}