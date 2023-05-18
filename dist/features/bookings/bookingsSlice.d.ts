import { RootState } from "../../app/store";
import { Booking } from "../../interfaces";
export interface BookingsState {
    bookingListData: Booking[];
    status: string;
    singleBookingData: Booking | undefined;
    singleBookingStatus: string;
}
export declare const bookingsSlice: import("@reduxjs/toolkit").Slice<BookingsState, {}, "bookings">;
export declare const getBookingsStatus: (state: RootState) => string;
export declare const getBookingsData: (state: RootState) => Booking[];
export declare const getSingleBooking: (state: RootState) => Booking | undefined;
export declare const getSingleBookingStatus: (state: RootState) => string;
declare const _default: import("redux").Reducer<BookingsState>;
export default _default;
