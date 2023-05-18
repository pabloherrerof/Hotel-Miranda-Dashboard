import { createAsyncThunk } from "@reduxjs/toolkit";
import usersListJson from "../../data/users.json";
import { delay } from "../otherFunctions";
import { User } from "../../interfaces";

const usersList = usersListJson as User[];

export const fetchUsers = createAsyncThunk<User[], void>(
  "users/fetchUsers ",
  async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(usersList);
      }, 200);
    });
  }
);

export const addUser = createAsyncThunk<User, User>(
  "users/addUser ",
  async (userObject: User) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(userObject);
      }, 200);
    });
  }
);

export const getUser = createAsyncThunk<User["id"], User["id"]>(
  "users/getUser ",
  async (userId: User["id"]) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(userId);
      }, 200);
    });
  }
);

export const deleteUser = createAsyncThunk<User["id"], User["id"]>(
  "users/deleteUser",
  async (userId: User["id"]) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(userId);
      }, 200);
    });
  }
);

export const editUser = createAsyncThunk<User, User>(
  "users/editUser",
  async (updatedUserObject: User) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(updatedUserObject);
      }, 200);
    });
  }
);
