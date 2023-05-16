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
  async (userObject) => {
    return await delay(userObject);
  }
);

export const getUser = createAsyncThunk("users/getUser ", async (userId: User["id"]) => {
  if(usersList.find((item) => {
    return item.id === userId;
  }) !== undefined) {
    return await  delay (usersList.find((item) => {
      return item.id === userId;
    })
    )
  } else return userId
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    return await delay(userId);
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (updatedUserObject) => {
    return await delay(updatedUserObject);
  }
);
