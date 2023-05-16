import { createAsyncThunk } from "@reduxjs/toolkit";
import contactsListJson from "../../data/contacts.json"
import { delay } from "../otherFunctions";
import { Contact } from "../../interfaces";

const contactsList = contactsListJson as Contact[]
export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
    return await delay(contactsList);
});


export const archiveContacts = createAsyncThunk("contacts/archiveContact", async (contactObject: Contact) => {
    return await delay(contactObject);
})

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactObject : Contact) => {
    return await delay(contactObject);
})