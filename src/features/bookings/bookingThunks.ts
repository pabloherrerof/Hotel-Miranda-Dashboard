import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsListJson from "../../data/bookings.json"
import { delay } from "../otherFunctions";
import { Booking } from "../../interfaces";



const bookingsList = bookingsListJson as Booking[];

export const fetchBookings = createAsyncThunk<Booking[], void>("bookings/fetchBookings", async () => {
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(bookingsList);
        }, 200);
    })
});

export const addBooking = createAsyncThunk<Booking, Booking>("bookings/addBooking", async (bookingObject :Booking) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(bookingObject);
        }, 200);
    })
});

export const getBooking = createAsyncThunk<Booking["id"], Booking["id"]>("bookings/getBooking", async (bookingId : Booking["id"]) =>{
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(bookingId);
        }, 200);
    })
})

export const deleteBooking = createAsyncThunk<Booking["id"], Booking["id"]>('bookings/deleteBooking', async (bookingId: Booking["id"]) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(bookingId);
        }, 200);
    })
});

export const editBooking = createAsyncThunk<Booking, Booking>("bookings/editBooking", async (updatedBookingObject: Booking)=>{
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(updatedBookingObject);
        }, 200);
    })
})
