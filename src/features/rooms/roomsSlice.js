import { createSlice } from "@reduxjs/toolkit";
import { fetchRooms, addRoom, deleteRoom, getRoom, editRoom } from "./roomsThunks";
import { toastError, toastSuccess } from "../toastify";
import { fetchBookings } from "../bookings/bookingThunks";
import { useDispatch } from "react-redux";



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
            toastError("Error! Couldn't load rooms.")
            
        })
        .addCase(fetchRooms.pending, (state, action) =>{
            state.status = "pending";
        })
        .addCase(fetchRooms.fulfilled, (state, action) =>{
            state.status = "fulfilled";
            state.roomsListData = action.payload
            
            
        })

        .addCase(addRoom.fulfilled, (state, action) =>{
            state.status = "fulfilled"
            state.roomsListData.push(action.payload)
            toastSuccess('The room has been saved!')
        })
        .addCase(addRoom.pending, (state) =>{
            state.status = "pending";
        })
        .addCase(addRoom.rejected, (state) =>{
            state.status = "rejected";
            toastError("Error! Couldn't create room.")
        })


        .addCase(deleteRoom.fulfilled, (state, action) =>{
            state.roomsListData = state.roomsListData.filter(item => item.id !== action.payload.deletedRoom.id);
            state.status = "fulfilled";
            toastSuccess('The room has been deleted!')
        })
        .addCase(deleteRoom.pending, (state) =>{
            state.status = "pending";
        })
        .addCase(deleteRoom.rejected, (state) =>{
            state.status = "rejected";
            toastError("Error! Couldn't delete the room.")
        })

        .addCase(getRoom.fulfilled, (state, action) =>{
            state.singleRoomStatus = "fulfilled";
            state.singleRoomData = action.payload
        })
        .addCase(getRoom.pending, (state) =>{
            state.singleRoomStatus = "pending";
        })
        .addCase(getRoom.rejected, (state) =>{
            state.singleRoomStatus = "rejected";
            toastError("Error! Couldn't get the room.")
        })

        .addCase(editRoom.fulfilled, (state,action) =>{
            state.singleRoomStatus = "fulfilled"
            toastSuccess('Changes saved!')
            for(let i = 0; i < state.roomsListData.length; i++) {
                if (state.roomsListData[i].id === action.payload.id) {
                    state.roomsListData[i] = action.payload;
                    state.singleRoomData = action.payload
                  return;
                }
              }
        })

        .addCase(editRoom.pending, (state) =>{
            state.singleRoomStatus = "pending";
        })    
        .addCase(editRoom.rejected, (state) =>{
            state.singleRoomStatus = "rejected";
            toastError("Error! Couldn't update the room.")
        })    
    },
})

export const getRoomsStatus = (state) => state.rooms.status;
export const getRoomsData = (state) => state.rooms.roomsListData;
export const getSingleRoom = (state) => state.rooms.singleRoomData;
export const getSingleRoomStatus = (state) => state.rooms.singleRoomStatus;


export default roomSlice.reducer;