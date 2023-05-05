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
        })


        .addCase(deleteContact.fulfilled, (state, action) =>{
            state.data = state.data.filter(item => item.id !== action.payload);
            state.status = "fullfilled";
        })
    
        .addCase(archiveContacts.pending, (state, action) => {
            state.status = "pending";
        })
        .addCase(archiveContacts.fulfilled, (state, action) =>{
            state.status = "fullfilled";
            for(let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.payload.id) {
                    if(state.data[i].archived === true){
                        state.data[i].archived = false
                    } else {
                        state.data[i].archived = true
                    }
                  return;
                }
              }
            
        })
    },
})

export const getContactsStatus = (state) => state.contacts.status;
export const getContactsData = (state) => state.contacts.data;

export default contactsSlice.reducer;