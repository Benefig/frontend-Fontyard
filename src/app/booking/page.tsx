'use client'
import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking(){

    const urlParams = useSearchParams();
    const vid = urlParams.get('id');
    const name = urlParams.get('name');

    const dispatch = useDispatch<AppDispatch>();

    const [nameLastname, setNameLastname] = useState<string>("");
    const [tel, setTel] = useState<string>("");

    const makeBooking = () => {
        if(nameLastname && tel && bookDate && bookLocation) {
            const item:BookingItem = {
                nameLastname: nameLastname,
                tel: tel,
                venue: bookLocation,
                bookDate: dayjs(bookDate).format("YYYY/MM/DD")
            }
            dispatch(addBooking(item));
        }
    }

    const [bookDate, setBookDate] = useState<Dayjs|null>(null);
    const [bookLocation, setBookLocation] = useState<string>('Bloom');

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4 ">
            <div className="font-semibold text-2xl">Venue Booking</div>
            <div className="font-medium text-xl">Venue: {name ? name : "none"}</div>
            <div className="flex flex-col gap-4">
                <TextField
                    variant="standard"
                    label="Name-Lastname"
                    value={nameLastname}
                    onChange={(e) => setNameLastname(e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Contact-Number"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                />
            </div>
            <br/><br/>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">Event Date and Location</div>
                <DateReserve locationName={name ?? ''} onDateChange={(value:Dayjs) => {setBookDate(value)}}
                onLocationChange={(value:string) => setBookLocation(value)}/>
            </div>

        <button className="block rounded-md bg-sky-600 hover:bg-sky-300 px-3 py-2 shadow-sm text-white" name="Book Venue"
        onClick={makeBooking}>
            Book Venue
        </button>
           
        </main>
    );
}