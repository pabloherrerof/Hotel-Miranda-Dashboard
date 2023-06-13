import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../API";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
        const res=  await fetchApi("api/contacts", "GET", undefined);
    return res.data
   
});


export const archiveContacts = createAsyncThunk("contacts/archiveContact", async (contactObject) => {

        const copyObject = {...contactObject}
        if(copyObject.archived === true){
            copyObject.archived = false
      } else {
        copyObject.archived = true
      }
        const res=  await fetchApi(`api/contacts/${contactObject.id}`, "PATCH", JSON.stringify({archived: copyObject.archived}));
    return res.data
   
})

