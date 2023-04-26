import { configureStore } from '@reduxjs/toolkit';
import { roomSlice } from '../features/rooms/roomsSlice';
import {bookingsSlice} from '../features/bookings/bookingsSlice';
import {usersSlice} from '../features/users/usersSlice';
import { contactsSlice } from '../features/contacts/contactsSlice';


export const store = configureStore({
  reducer: {
    rooms: roomSlice.reducer,
    bookings: bookingsSlice.reducer,
    users: usersSlice.reducer,
    contacts: contactsSlice.reducer,
  },
});
