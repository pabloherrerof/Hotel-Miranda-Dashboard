import { createAsyncThunk } from "@reduxjs/toolkit";
import contactsListJson from "../../data/contacts.json"
import { Contact } from "../../interfaces";

const contactsList = contactsListJson as Contact[]
export const fetchContacts = createAsyncThunk<Contact[], void>("contacts/fetchContacts", async () => {
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(contactsList);
        }, 200);
    })
});


export const archiveContacts = createAsyncThunk<Contact, Contact>("contacts/archiveContact", async (contactObject: Contact) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(contactObject);
        }, 200);
    })
})
