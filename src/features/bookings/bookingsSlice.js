import { createSlice } from "@reduxjs/toolkit";
import { addBooking, deleteBooking, editBooking, fetchBookings, getBooking } from "./bookingThunks";
import { toastError, toastSuccess } from "../toastify";



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
        .addCase(fetchBookings.rejected, (state) =>{
            state.status = "rejected";
            toastError("Error! Couldn't load bookings.");
        })
        .addCase(fetchBookings.pending, (state) =>{
            state.status = "pending";
        })
        .addCase(fetchBookings.fulfilled, (state, action) =>{
            state.bookingListData = action.payload;
            state.status = "fulfilled";
            
        })

        .addCase(addBooking.fulfilled, (state, action) =>{
            toastSuccess('The booking has been saved!')
            state.bookingListData.push(action.payload)
            state.status = "fulfilled";
        })
        .addCase(addBooking.pending, (state) =>{
            state.status = "pending";
        })
        .addCase(addBooking.rejected, (state) =>{
            state.status = "rejected";
            toastError("Error! Couldn't create booking.")
        })

        .addCase(deleteBooking.fulfilled, (state, action) =>{
            toastSuccess('The booking has been deleted!')
            state.bookingListData = state.bookingListData.filter(item => item.id !== action.payload.deletedBooking.id);
            state.status = "fulfilled";
            
        })
        .addCase(deleteBooking.pending, (state) =>{
            state.status = "pending";
        })
        .addCase(deleteBooking.rejected, (state) =>{
            state.status = "rejected";
            toastError("Error! Couldn't delete the booking.")
        })


        .addCase(getBooking.fulfilled, (state, action) =>{
                state.singleBookingData = action.payload 
            state.singleBookingStatus = "fulfilled";
        })

        .addCase(getBooking.pending, (state) =>{
            state.singleBookingStatus = "pending";
        })
        .addCase(getBooking.rejected, (state) =>{
            state.singleBookingStatus = "rejected";
            toastError("Error! Couldn't get the booking.")
        })

        .addCase(editBooking.fulfilled, (state,action) =>{
            toastSuccess('Changes saved!')
            state.singleBookingStatus = "fulfilled"
            for(let i = 0; i < state.bookingListData.length; i++) {
                if (state.bookingListData[i].id === action.payload.id) {
                    state.bookingListData[i] = action.payload;
                    state.singleBookingData = action.payload
                  return;
                }
              }
            
        })

        .addCase(editBooking.pending, (state) =>{
            state.singleBookingStatus = "pending";
        })
        .addCase(editBooking.rejected, (state) =>{
            state.singleBookingStatus = "rejected";
            toastError("Error! Couldn't update the booking.")
        })
    },
})

export const getBookingsStatus = (state) => state.bookings.status;
export const getBookingsData = (state) => state.bookings.bookingListData;
export const getSingleBooking = (state) => state.bookings.singleBookingData;
export const getSingleBookingStatus = (state) => state.bookings.singleBookingStatus;



export default bookingsSlice.reducer;