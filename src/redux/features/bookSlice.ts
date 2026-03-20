import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems:[]};

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const newItem = action.payload;
            const index = state.bookItems.findIndex(
                (item) =>
                item.venue === newItem.venue &&
                item.bookDate === newItem.bookDate
            );

            if (index !== -1) {
                state.bookItems[index] = newItem;
            } else {
                state.bookItems.push(newItem);
            }
        },
        removeBooking: (state, action:PayloadAction<BookingItem>) => {
            const remainItems = state.bookItems.filter(obj => {
                return ( (obj.nameLastname !== action.payload.nameLastname)
                || (obj.tel !== action.payload.tel)
                || (obj.venue !== action.payload.venue)
                || (obj.bookDate !== action.payload.bookDate))
            })
            state.bookItems = remainItems;
        }
    }
})

export const {addBooking, removeBooking} = bookSlice.actions
export default bookSlice.reducer