import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, archiveContacts } from "./contactThunks";
import { toast } from "react-toastify";


const toastSuccess = (msg)=>{
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });    
}

const toastError = (msg) =>{
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}

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
            toastError("Error! Couldn't load contacts.");
        })
        .addCase(fetchContacts.pending, (state, action) =>{
            state.status = "pending";
        })
        .addCase(fetchContacts.fulfilled, (state, action) =>{
            state.status = "fulfilled";
            state.data = action.payload;
        })

      


        .addCase(archiveContacts.rejected, (state, action) => {
            state.status = "rejected";
           toastError("Error! Couldn't update the contact.");
        })
    
        .addCase(archiveContacts.pending, (state, action) => {
            state.status = "pending";
        })
        .addCase(archiveContacts.fulfilled, (state, action) =>{
            toastSuccess('Changes saved!');
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