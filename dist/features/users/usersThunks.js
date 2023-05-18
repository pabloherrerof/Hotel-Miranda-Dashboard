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
import usersListJson from "../../data/users.json";
const usersList = usersListJson;
export const fetchUsers = createAsyncThunk("users/fetchUsers ", () => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(usersList);
        }, 200);
    });
}));
export const addUser = createAsyncThunk("users/addUser ", (userObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(userObject);
        }, 200);
    });
}));
export const getUser = createAsyncThunk("users/getUser ", (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(userId);
        }, 200);
    });
}));
export const deleteUser = createAsyncThunk("users/deleteUser", (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(userId);
        }, 200);
    });
}));
export const editUser = createAsyncThunk("users/editUser", (updatedUserObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(updatedUserObject);
        }, 200);
    });
}));
