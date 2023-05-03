import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsList from "../../data/rooms.json"
import { delay } from "../otherFunctions";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
    return await delay(roomsList);
});

export const addRoom = createAsyncThunk("rooms/addRoom", async (roomObject) => {
   return await delay (roomObject);
});

export const getRoom = createAsyncThunk("rooms/getRoom", async (roomId) =>{
    
    return await roomsList.find(room =>  {
        console.log(room.id)
        return room.id === roomId})
   
})

export const deleteRoom = createAsyncThunk('rooms/deleteRooms', async (roomId) => {
    return await delay(roomId);
});

export const editRoom = createAsyncThunk("rooms/editRoom", async (updatedRoomObject)=>{
    return await delay(updatedRoomObject);
})


