import { createAsyncThunk } from "@reduxjs/toolkit";
import usersListJson from "../../data/users.json";
import { delay } from "../otherFunctions";
import { User } from "../../interfaces";

const usersList = usersListJson as User[];

export const fetchUsers = createAsyncThunk("users/fetchUsers ", async () => {
  return await delay(usersList);
});

export const addUser = createAsyncThunk(
  "users/addUser ",
  async (userObject: User) => {
    return await delay(userObject);
  }
);

export const getUser = createAsyncThunk("users/getUser ", async (userId: User["id"]) => {
  return await delay(userId)
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId : User["id"]) => {
    return await delay(userId);
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (updatedUserObject: User) => {
    return await delay(updatedUserObject);
  }
);
