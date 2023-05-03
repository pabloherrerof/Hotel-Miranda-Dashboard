import { createSlice } from "@reduxjs/toolkit";
import { addBooking, deleteBooking, editBooking, fetchBookings, getBooking } from "./bookingThunks";
import { searchBookingRoom } from "../API";



export const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        bookingListData: [],
        status: "idle",
        singleBookingData: {},
        singleBookingStatus: "idle",
    },
    

    extraReducers(builder){
        builder
        .addCase(fetchBookings.rejected, (state, action) =>{
            state.status = "rejected";
        })
        .addCase(fetchBookings.pending, (state, action) =>{
            state.status = "pending";
        })
        .addCase(fetchBookings.fulfilled, (state, action) =>{
            state.status = "fulfilled";
            state.bookingListData = action.payload;
        })

        .addCase(addBooking.fulfilled, (state, action) =>{
            const lastId = parseInt(state.bookingListData[state.bookingListData.length  -1].id.slice(2));    
            action.payload.id = "B-" + (lastId + 1).toString().padStart(4, "0");
            state.bookingListData.push(action.payload)
        })
        .addCase(addBooking.pending, (state) =>{
            state.status = "pending";
        })


        .addCase(deleteBooking.fulfilled, (state, action) =>{
            state.bookingListData = state.bookingListData.filter(item => item.id !== action.payload);
            state.status = "fulfilled";
        })
        .addCase(deleteBooking.pending, (state, action) =>{
            state.status = "pending";
        })


        .addCase(getBooking.fulfilled, (state, action) =>{
            state.singleBookingData = action.payload;
            state.singleBookingStatus = "fulfilled";
        })
        .addCase(getBooking.pending, (state, action) =>{
            state.singleBookingStatus = "pending";
        })

        .addCase(editBooking.fulfilled, (state,action) =>{
            state.bookingListData = state.bookingListData.filter(item => item.id !== action.payload.id);
            state.bookingListData.push(action.payload);
        })

        .addCase(editBooking.pending, (state, action) =>{
            state.status = "pending";
        })
    },
})

export const getBookingsStatus = (state) => state.bookings.status;
export const getBookingsData = (state) => state.bookings.bookingListData;
export const getSingleBooking = (state) => state.bookings.singleBookingData;
export const getSingleBookingStatus = (state) => state.bookings.singleBookingStatus;

export default bookingsSlice.reducer;