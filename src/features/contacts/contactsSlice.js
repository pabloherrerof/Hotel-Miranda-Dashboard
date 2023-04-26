import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, archiveContacts, deleteContact } from "./contactThunks";




export const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        data: [],
        status: "idle",
    },
    

    extraReducers(builder){
        builder
        .addCase(fetchContacts.rejected, (state, action) =>{
            state.status = "rejected";
        })
        .addCase(fetchContacts.pending, (state, action) =>{
            state.status = "pending";
        })
        .addCase(fetchContacts.fulfilled, (state, action) =>{
            state.status = "fulfilled";
            state.data = action.payload;
            state.data.forEach((obj, index) => {
                obj.id = "C" + (index + 1).toString().padStart(3, "0");
              });
        })


        .addCase(deleteContact.fulfilled, (state, action) =>{
            state.data = state.data.filter(item => item.id !== action.payload);
            state.status = "fullfilled";
        })
    

        .addCase(archiveContacts.fulfilled, (state, action) =>{
            state.data = state.data.find(item => item.id !== action.payload);
            state.status = "fullfilled";
        })
        
    },
})

export const getContactsStatus = (state) => state.contacts.status;
export const getContactsData = (state) => state.contacts.data;

export default contactsSlice.reducer;