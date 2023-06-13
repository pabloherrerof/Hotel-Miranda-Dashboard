import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../API";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
    const res=  await fetchApi(`api/rooms/`, "GET", undefined);
  return await res.data
});

export const addRoom = createAsyncThunk("rooms/addRoom", async (roomObject) => {

    console.log(roomObject)
    const res=  await fetchApi(`api/rooms/`, "POST",  JSON.stringify(roomObject));
  return await res.data
});

export const getRoom = createAsyncThunk("rooms/getRoom", async (roomId) =>{
    const res=  await fetchApi(`api/rooms/${roomId}`, "GET", undefined);
  return await res.data
  
})

export const deleteRoom = createAsyncThunk('rooms/deleteRooms', async (roomId) => {

    const res=  await fetchApi(`api/rooms/${roomId}`, "DELETE", undefined);
    return await res.data

});

export const editRoom = createAsyncThunk("rooms/editRoom", async (updatedRoomObject)=>{

    const res=  await fetchApi(`api/rooms/${updatedRoomObject.id}`, "PUT", JSON.stringify(updatedRoomObject));
    return await res.data
})


