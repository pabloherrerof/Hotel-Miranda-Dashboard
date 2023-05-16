import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsListJson from "../../data/bookings.json"
import { delay } from "../otherFunctions";
import { Booking } from "../../interfaces";



const bookingsList = bookingsListJson as Booking[];

export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async () => {
    return await delay(bookingsList);
});

export const addBooking = createAsyncThunk("bookings/addBooking", async (bookingObject) => {
   return await delay (bookingObject);
});

export const getBooking = createAsyncThunk("bookings/getBooking", async (bookingId : Booking["id"]) =>{
    if(bookingsList.find((item: Booking) => {
        return item.id === bookingId;
      }) !== undefined) {
        return await  delay (bookingsList.find((item) => {
          return item.id === bookingId;
        })
        )
      } else return bookingId
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (bookingId) => {
    return await delay(bookingId);
});

export const editBooking = createAsyncThunk("bookings/editBooking", async (updatedBookingObject)=>{
    return await delay(updatedBookingObject);
})
