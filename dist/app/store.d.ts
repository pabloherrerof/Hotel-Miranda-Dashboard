export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    rooms: import("../features/rooms/roomsSlice").RoomsState;
    bookings: import("../features/bookings/bookingsSlice").BookingsState;
    users: import("../features/users/usersSlice").UsersState;
    contacts: import("../features/contacts/contactsSlice").ContactsState;
}, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<{
    rooms: import("../features/rooms/roomsSlice").RoomsState;
    bookings: import("../features/bookings/bookingsSlice").BookingsState;
    users: import("../features/users/usersSlice").UsersState;
    contacts: import("../features/contacts/contactsSlice").ContactsState;
}, import("redux").AnyAction>]>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
