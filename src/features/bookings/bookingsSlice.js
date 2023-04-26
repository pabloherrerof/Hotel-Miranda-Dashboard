import { createSlice } from "@reduxjs/toolkit";
import { addBooking, deleteBooking, editBooking, fetchBookings, getBooking } from "./bookingThunks";



export const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        data: [],
        status: "idle",
        booking: {},
    },
    

    extraReducers(builder){
        builder
        .addCase(fetchBookings.rejected, (state, action) =>{
            state.status = "rejected";
            state.error = ""
        })
        .addCase(fetchBookings.pending, (state, action) =>{
            state.status = "pending";
        })
        .addCase(fetchBookings.fulfilled, (state, action) =>{
            state.status = "fulfilled";
            state.data = action.payload;
            state.data.forEach((obj, index) => {
                obj.id = "B" + (index + 1).toString().padStart(3, "0");
              });
        })

        .addCase(addBooking.fulfilled, (state, action) =>{
            state.data.push(action.payload)
        })
        .addCase(addBooking.pending, (state) =>{
            state.status = "pending";
        })


        .addCase(deleteBooking.fulfilled, (state, action) =>{
            state.data = state.data.filter(item => item.id !== action.payload);
            state.status = "fullfilled";
        })
        .addCase(deleteBooking.pending, (state, action) =>{
            state.status = "pending";
        })


        .addCase(getBooking.fulfilled, (state, action) =>{
            state.data = state.data.find(item => item.id !== action.payload);
            state.status = "fullfilled";
        })
        .addCase(getBooking.pending, (state, action) =>{
            state.status = "pending";
        })

        .addCase(editBooking.fulfilled, (state,action) =>{
            state.data = state.data.filter(item => item.id !== action.payload.id);
            state.data.push(action.payload);
        })

        .addCase(editBooking.pending, (state, action) =>{
            state.status = "pending";
        })


       



        
    },
})

export const getBookingsStatus = (state) => state.bookings.status;
export const getBookingsData = (state) => state.bookings.data;

export default bookingsSlice.reducer;