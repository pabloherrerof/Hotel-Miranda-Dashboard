var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createAsyncThunk } from "@reduxjs/toolkit";
import contactsListJson from "../../data/contacts.json";
const contactsList = contactsListJson;
export const fetchContacts = createAsyncThunk("contacts/fetchContacts", () => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(contactsList);
        }, 200);
    });
}));
export const archiveContacts = createAsyncThunk("contacts/archiveContact", (contactObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(contactObject);
        }, 200);
    });
}));
