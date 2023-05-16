import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, archiveContacts, deleteContact } from "./contactThunks";
import { Contact } from "../../interfaces";
import { RootState } from "../../app/store";

interface ContactsState {
  data: Contact[];
  status: string;
}

interface ContactsAction {
    type: string;
    payload: any;
}

const initialState : ContactsState = {
    data: [],
    status: "idle",
}

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchContacts.rejected, (state: ContactsState) => {
        state.status = "rejected";
      })
      .addCase(fetchContacts.pending, (state: ContactsState) => {
        state.status = "pending";
      })
      .addCase(fetchContacts.fulfilled, (state: ContactsState, action: ContactsAction) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })

      .addCase(deleteContact.fulfilled, (state: ContactsState, action: ContactsAction) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.status = "fullfilled";
      })

      .addCase(archiveContacts.pending, (state: ContactsState) => {
        state.status = "pending";
      })
      .addCase(archiveContacts.fulfilled, (state: ContactsState, action: ContactsAction) => {
        state.status = "fullfilled";
        for (let i = 0; i < state.data.length; i++) {
          if (state.data[i].id === action.payload.id) {
            if (state.data[i].archived === true) {
              state.data[i].archived = false;
            } else {
              state.data[i].archived = true;
            }
            return;
          }
        }
      });
  },
});

export const getContactsStatus = (state : RootState) => state.contacts.status;
export const getContactsData = (state: RootState) => state.contacts.data;

export default contactsSlice.reducer;
