import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../API";

export const fetchUsers = createAsyncThunk("users/fetchUsers ", async () => {
  const res = await fetchApi("api/users/", "GET", undefined);
  return await res.data;
});

export const addUser = createAsyncThunk(
  "users/addUser ",
  async (userObject) => {
    const res = await fetchApi(
      "api/users/",
      "POST",
      JSON.stringify(userObject)
    );
    return await res.data;
  }
);

export const getUser = createAsyncThunk("users/getUser ", async (userId) => {
  const res = await fetchApi(`api/users/${userId}`, "GET", undefined);
  return await res.data;
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    const res = await fetchApi(`api/users/${userId}`, "DELETE", undefined);
    return await res.data;
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (updatedUserObject) => {
    const res = await fetchApi(
      `api/users/${updatedUserObject.id}`,
      "PUT",
      JSON.stringify(updatedUserObject)
    );
    return await res.data;
  }
);

export const getLoggedUser = createAsyncThunk(
  "users/getLoggedUser ",
  async (userId) => {
    const res = await fetchApi(`api/users/${userId}`, "GET", undefined);
    return await res.data;
  }
);
