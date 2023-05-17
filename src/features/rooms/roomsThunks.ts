import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsListJson from "../../data/rooms.json"
import { delay } from "../otherFunctions";
import { Room } from "../../interfaces";

const roomsList = roomsListJson as Room[]

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
    return await delay(roomsList);
});

export const addRoom = createAsyncThunk("rooms/addRoom", async (roomObject: Room) => {
   return await delay (roomObject);
});

export const getRoom = createAsyncThunk("rooms/getRoom", async (roomId : Room["id"]) =>{
    return await delay(roomId);
   
})

export const deleteRoom = createAsyncThunk('rooms/deleteRooms', async (roomId: Room["id"]) => {
    return await delay(roomId);
});

export const editRoom = createAsyncThunk("rooms/editRoom", async (updatedRoomObject: Room)=>{
    return await delay(updatedRoomObject);
})


