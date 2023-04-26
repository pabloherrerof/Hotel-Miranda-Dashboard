import { createSlice } from "@reduxjs/toolkit";
import { fetchRooms, addRoom, deleteRoom, getRoom, editRoom } from "./roomsThunks";


export const roomSlice = createSlice({
    name: "rooms",
    initialState: {
        data: [],
        status: "idle",
        room: {},
    },
    

    extraReducers(builder){
        builder
        .addCase(fetchRooms.rejected, (state, action) =>{
            state.status = "rejected";
        })
        .addCase(fetchRooms.pending, (state, action) =>{
            state.status = "pending";
        })
        .addCase(fetchRooms.fulfilled, (state, action) =>{
            state.status = "fulfilled";
            state.data = action.payload;
            state.data.forEach((obj, index) => {
                obj.id = "R" + (index + 1).toString().padStart(3, "0");
              });
        })

        .addCase(addRoom.fulfilled, (state, action) =>{
            state.data.push(action.payload)
        })
        .addCase(addRoom.pending, (state) =>{
            state.status = "pending";
        })


        .addCase(deleteRoom.fulfilled, (state, action) =>{
            state.data = state.data.filter(item => item.id !== action.payload);
            state.status = "fullfilled";
        })
        .addCase(deleteRoom.pending, (state, action) =>{
            state.status = "pending";
        })


        .addCase(getRoom.fulfilled, (state, action) =>{
            state.data = state.data.find(item => item.id !== action.payload);
            state.status = "fullfilled";
        })
        .addCase(getRoom.pending, (state, action) =>{
            state.status = "pending";
        })

        .addCase(editRoom.fulfilled, (state,action) =>{
            state.data = state.data.filter(item => item.id !== action.payload.id);
            state.data.push(action.payload);
        })

        .addCase(editRoom.pending, (state, action) =>{
            state.status = "pending";
        })


       



        
    },
})

export const getRoomStatus = (state) => state.rooms.status;
export const getRoomData = (state) => state.rooms.data;

export default roomSlice.reducer;