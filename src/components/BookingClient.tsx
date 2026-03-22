'use client'

import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import Link from "next/link";

export default function BookingClient({ hotels }: { hotels: HotelJson }) {
    const urlParams = useSearchParams();
    const hid = urlParams.get('id');
    const selectedHotel = hotels.data.find(v => v._id === hid);

    const dispatch = useDispatch<AppDispatch>();

    const [nameLastname, setNameLastname] = useState("");
    const [tel, setTel] = useState("");
    const [bookDate, setBookDate] = useState<Dayjs | null>(null);
    const [bookLocation, setBookLocation] = useState("");
    const [booked, setBooked] = useState(false);

    const makeBooking = () => {
        if (!nameLastname || !tel || !bookDate || !bookLocation) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        const target = hotels.data.find(v => v._id === bookLocation);
        const item: BookingItem = {
            nameLastname,
            tel,
            hotel: target?.name ?? "",
            bookDate: bookDate.format("DD/MM/YYYY"),
        };

        dispatch(addBooking(item));
        setBooked(true);
    };

    if (booked) {
        return (
            <div className="max-w-md mx-auto px-4 py-20 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">จองสำเร็จ!</h2>
                <p className="text-gray-500 mb-8 text-sm">การจองของคุณได้รับการบันทึกเรียบร้อยแล้ว</p>
                <Link
                    href="/mybooking"
                    className="inline-block px-6 py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors text-sm"
                >
                    ดูรายการจองของฉัน
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-lg mx-auto px-4 py-8">
            <div className="mb-5">
                <Link href="/hotel" className="text-sm text-green-700 hover:underline">
                    ← กลับไปรายการโรงแรม
                </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">จองห้องพัก</h1>
                {selectedHotel && (
                    <p className="text-gray-500 text-sm mb-6">
                        โรงแรม:{" "}
                        <span className="font-medium text-gray-700">{selectedHotel.name}</span>
                    </p>
                )}
                <div className="flex flex-col gap-5">
                    <TextField
                        variant="outlined"
                        label="ชื่อ-นามสกุล"
                        size="small"
                        fullWidth
                        value={nameLastname}
                        onChange={(e) => setNameLastname(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        label="เบอร์โทรศัพท์"
                        size="small"
                        fullWidth
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                    />
                    <div>
                        <p className="text-sm text-gray-600 mb-2">วันเข้าพักและสถานที่</p>
                        <DateReserve
                            locationId={hid ?? ''}
                            hotelsJson={hotels}
                            onDateChange={(value: Dayjs | null) => setBookDate(value)}
                            onLocationChange={(value: string) => setBookLocation(value)}
                        />
                    </div>
                    <button
                        className="w-full py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors mt-1"
                        onClick={makeBooking}
                    >
                        ยืนยันการจอง
                    </button>
                </div>
            </div>
        </main>
    );
}
