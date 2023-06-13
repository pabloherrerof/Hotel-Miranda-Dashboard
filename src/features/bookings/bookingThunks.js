import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../API";

export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async () => {
    const res=  await fetchApi("api/bookings", "GET", undefined);
    return res.data
});

export const addBooking = createAsyncThunk("bookings/addBooking", async (bookingObject) => {
    const res=  await fetchApi("api/bookings/", "POST", 
      JSON.stringify(bookingObject)
    );
    return await res.data
});

export const getBooking = createAsyncThunk("bookings/getBooking", async (bookingId) =>{
  const res=  await fetchApi(`api/bookings/${bookingId}`, "GET", undefined);
  return res.data
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (bookingId) => {
    const res=  await fetchApi(`api/bookings/${bookingId}`, "DELETE", undefined);
    return await res.data
});

export const editBooking = createAsyncThunk("bookings/editBooking", async (updatedBookingObject)=>{
        const res = await fetchApi(
          `api/bookings/${updatedBookingObject.id}`,
          "PUT",
          JSON.stringify(updatedBookingObject)
        );
        return await res.data;
})
