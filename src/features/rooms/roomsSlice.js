import { createSlice } from "@reduxjs/toolkit";
import { fetchRooms, addRoom, deleteRoom, getRoom, editRoom } from "./roomsThunks";


export const roomSlice = createSlice({
    name: "rooms",
    initialState: {
        roomsListData: [],
        status: "idle",
        singleRoomData: {},
        singleRoomStatus: "idle",
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
            state.roomsListData = action.payload;
            
            
        })

        .addCase(addRoom.fulfilled, (state, action) =>{
            state.status = "fulfilled"
            const lastId = parseInt(state.roomsListData[state.roomsListData.length  -1].id.slice(2));    
            action.payload.id = "R-" + (lastId + 1).toString().padStart(4, "0");
            state.roomsListData.push(action.payload)
        })
        .addCase(addRoom.pending, (state) =>{
            state.status = "pending";
        })


        .addCase(deleteRoom.fulfilled, (state, action) =>{
            state.roomsListData = state.roomsListData.filter(item => item.id !== action.payload);
            state.status = "fulfilled";
        })
        .addCase(deleteRoom.pending, (state, action) =>{
            state.status = "pending";
        })


        .addCase(getRoom.fulfilled, (state, action) =>{
            state.singleRoomStatus = "fulfilled";
             if(typeof action.payload === "object"){
                state.singleRoomData = action.payload
            } else{
                state.singleRoomData = state.roomsListData.find(booking => booking.id === action.payload)
            }
        })
        .addCase(getRoom.pending, (state, action) =>{
            state.singleRoomStatus = "pending";
        })

        .addCase(editRoom.fulfilled, (state,action) =>{
            state.status = "fulfilled"
            for(let i = 0; i < state.roomsListData.length; i++) {
                if (state.roomsListData[i].id === action.payload.id) {
                    state.roomsListData[i] = action.payload;
                    state.singleRoomData = action.payload
                  return;
                }
              }
        })

        .addCase(editRoom.pending, (state, action) =>{
            state.status = "pending";
        })    
    },
})

export const getRoomsStatus = (state) => state.rooms.status;
export const getRoomsData = (state) => state.rooms.roomsListData;
export const getSingleRoom = (state) => state.rooms.singleRoomData;
export const getSingleRoomStatus = (state) => state.rooms.singleRoomStatus;


export default roomSlice.reducer;