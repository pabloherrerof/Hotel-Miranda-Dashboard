import { Contact } from "../../interfaces";
import { RootState } from "../../app/store";
export interface ContactsState {
    data: Contact[];
    status: string;
}
export declare const contactsSlice: import("@reduxjs/toolkit").Slice<ContactsState, {}, "contacts">;
export declare const getContactsStatus: (state: RootState) => string;
export declare const getContactsData: (state: RootState) => Contact[];
declare const _default: import("redux").Reducer<ContactsState>;
export default _default;
