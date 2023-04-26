import { createAsyncThunk } from "@reduxjs/toolkit";
import usersList from "../../data/users.json"
import { delay } from "../otherFunctions";

export const fetchUsers = createAsyncThunk("users/fetchUsers ", async () => {
    return await delay(usersList);
});

export const addUser  = createAsyncThunk("users/addUser ", async (userObject) => {
   return await delay (userObject);
});

export const getUser = createAsyncThunk("users/getUser ", async (userId) =>{
    return await delay (userId);
})

export const deleteUser  = createAsyncThunk('users/deleteUser', async (userId) => {
    return await delay(userId);
});

export const editUser  = createAsyncThunk("users/editUser", async (updatedUserObject)=>{
    return await delay(updatedUserObject);
})
