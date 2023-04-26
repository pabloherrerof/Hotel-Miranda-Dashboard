import { createAsyncThunk } from "@reduxjs/toolkit";
import contactsList from "../../data/contacts.json"
import { delay } from "../otherFunctions";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
    return await delay(contactsList);
});

export const archiveContacts = createAsyncThunk("contacts/archiveContact", async (contactObject) => {
    return await delay(contactObject);
})

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactObject) => {
    return await delay(contactObject);
})