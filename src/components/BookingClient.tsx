'use client'

import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";

export default function BookingClient({ hotels }: { hotels: HotelJson }) {

    const urlParams = useSearchParams();
    const hid = urlParams.get('id');

    const selectedHotel = hotels.data.find(v => v._id === hid);

    const dispatch = useDispatch<AppDispatch>();

    const [nameLastname, setNameLastname] = useState("");
    const [tel, setTel] = useState("");
    const [bookDate, setBookDate] = useState<Dayjs | null>(null);
    const [bookLocation, setBookLocation] = useState("");

    const makeBooking = () => {
        if (!nameLastname || !tel || !bookDate || !bookLocation) {
            alert("Please fill all fields to Book");
            return;
        }

        const selectedHotel = hotels.data.find(v => v._id === bookLocation);

        const item: BookingItem = {
            nameLastname,
            tel,
            hotel: selectedHotel?.name ?? "",
            bookDate: bookDate.format("YYYY/MM/DD")
        };

        dispatch(addBooking(item));
    };

    return (
        <main className="w-full flex flex-col items-center space-y-4">
            <div className="text-2xl font-semibold">Hotel Booking</div>
            <div className="text-xl font-medium">Hotel: {selectedHotel?.name ?? "none"}</div>

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

            <div className="space-y-2">
                <div className="text-gray-600">Event Date and Location</div>

                <DateReserve
                    locationId={hid ?? ''}
                    hotelsJson={hotels}
                    onDateChange={(value: Dayjs | null) => setBookDate(value)}
                    onLocationChange={(value: string) => setBookLocation(value)}
                />
            </div>

            <button
                className="bg-sky-600 hover:bg-sky-300 text-white px-3 py-2 rounded-md"
                onClick={makeBooking}
            >
                Book Hotel
            </button>
        </main>
    );
}