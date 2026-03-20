"use client"

import { useState } from "react";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem } from "@mui/material";

export default function DateReserve({locationName, onDateChange, onLocationChange}:{locationName:string, onDateChange:Function, onLocationChange:Function}) {

    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const mapNameToValue: Record<string, string> = {
        "The Bloom Pavilion": "Bloom",
        "Spark Space": "Spark",
        "The Grand Table": "GrandTable"
    };
    const [location, setLocation] = useState<string>(mapNameToValue[locationName] || '');

    return(
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex gap-5 items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white"
                value={reserveDate}
                onChange={(value) => {setReserveDate(value); onDateChange(value);}}/>
            </LocalizationProvider>
            
            <Select variant="standard" name="venue" id="venue" value={location} displayEmpty
            onChange={(e) => {setLocation(e.target.value); onLocationChange(e.target.value);}}
            className="h-[2em] w-[200px]">
                <MenuItem value="" sx={{ color: 'gray', fontStyle: 'italic' }}>-- Select Venue --</MenuItem>
                <MenuItem value ="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value ="Spark">Spark Space</MenuItem>
                <MenuItem value ="GrandTable">The Grand Table</MenuItem>
                {/*
                <MenuItem value="SDG">Sand Garden</MenuItem>
                <MenuItem value="BYS">Boatyard Stare</MenuItem>
                */}
            </Select>
        </div>
    );
}