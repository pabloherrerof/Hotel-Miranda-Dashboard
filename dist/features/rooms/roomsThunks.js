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
import roomsListJson from "../../data/rooms.json";
const roomsList = roomsListJson;
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", () => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(roomsList);
        }, 200);
    });
}));
export const addRoom = createAsyncThunk("rooms/addRoom", (roomObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(roomObject);
        }, 200);
    });
}));
export const getRoom = createAsyncThunk("rooms/getRoom", (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(roomId);
        }, 200);
    });
}));
export const deleteRoom = createAsyncThunk("rooms/deleteRooms", (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(roomId);
        }, 200);
    });
}));
export const editRoom = createAsyncThunk("rooms/editRoom", (updatedRoomObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(updatedRoomObject);
        }, 200);
    });
}));
