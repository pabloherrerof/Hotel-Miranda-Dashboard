var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsListJson from "../../data/bookings.json";
const bookingsList = bookingsListJson;
export const fetchBookings = createAsyncThunk("bookings/fetchBookings", () => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(bookingsList);
        }, 200);
    });
}));
export const addBooking = createAsyncThunk("bookings/addBooking", (bookingObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(bookingObject);
        }, 200);
    });
}));
export const getBooking = createAsyncThunk("bookings/getBooking", (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(bookingId);
        }, 200);
    });
}));
export const deleteBooking = createAsyncThunk('bookings/deleteBooking', (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(bookingId);
        }, 200);
    });
}));
export const editBooking = createAsyncThunk("bookings/editBooking", (updatedBookingObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(updatedBookingObject);
        }, 200);
    });
}));
