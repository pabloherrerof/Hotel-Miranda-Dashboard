import { createSlice } from "@reduxjs/toolkit";
import { addBooking, deleteBooking, editBooking, fetchBookings, getBooking, } from "./bookingThunks";
const initialState = {
    bookingListData: [],
    status: "idle",
    singleBookingData: {
        name: "",
        id: "",
        orderDate: "",
        checkIn: "",
        checkOut: "",
        room: "",
        specialRequest: "",
    },
    singleBookingStatus: "idle",
};
export const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.rejected, (state) => {
            state.status = "rejected";
        })
            .addCase(fetchBookings.pending, (state) => {
            state.status = "pending";
        })
            .addCase(fetchBookings.fulfilled, (state, action) => {
            state.bookingListData = action.payload;
            state.status = "fulfilled";
        })
            .addCase(addBooking.fulfilled, (state, action) => {
            const lastId = parseInt(state.bookingListData[state.bookingListData.length - 1].id.slice(2));
            action.payload.id = "B-" + (lastId + 1).toString().padStart(4, "0");
            state.bookingListData.push(action.payload);
            state.status = "fulfilled";
        })
            .addCase(deleteBooking.fulfilled, (state, action) => {
            state.bookingListData = state.bookingListData.filter((item) => item.id !== action.payload);
            state.status = "fulfilled";
        })
            .addCase(deleteBooking.pending, (state, action) => {
            state.status = "pending";
        })
            .addCase(getBooking.fulfilled, (state, action) => {
            state.singleBookingData = state.bookingListData.find((booking) => booking.id === action.payload);
            state.singleBookingStatus = "fulfilled";
        })
            .addCase(getBooking.pending, (state) => {
            state.singleBookingStatus = "pending";
        })
            .addCase(editBooking.fulfilled, (state, action) => {
            state.status = "fulfilled";
            for (let i = 0; i < state.bookingListData.length; i++) {
                if (state.bookingListData[i].id === action.payload.id) {
                    state.bookingListData[i] = action.payload;
                    state.singleBookingData = action.payload;
                    return;
                }
            }
        })
            .addCase(editBooking.pending, (state) => {
            state.status = "pending";
        });
    },
});
export const getBookingsStatus = (state) => state.bookings.status;
export const getBookingsData = (state) => state.bookings.bookingListData;
export const getSingleBooking = (state) => state.bookings.singleBookingData;
export const getSingleBookingStatus = (state) => state.bookings.singleBookingStatus;
export default bookingsSlice.reducer;
