import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRooms,
  addRoom,
  deleteRoom,
  getRoom,
  editRoom,
} from "./roomsThunks";
import { Room } from "../../interfaces";
import { RootState } from "../../app/store";

interface RoomsState {
  roomsListData: Room[];
  status: string;
  singleRoomData: Room | undefined | {};
  singleRoomStatus: string;
}

interface RoomsAction{
    type: string;
    payload: any;
}

const initialState : RoomsState = {
    roomsListData: [],
    status: "idle",
    singleRoomData: {},
    singleRoomStatus: "idle",
}

export const roomSlice = createSlice({
  name: "rooms",
  initialState,

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchRooms.rejected, (state: RoomsState) => {
        state.status = "rejected";
      })
      .addCase(fetchRooms.pending, (state: RoomsState) => {
        state.status = "pending";
      })
      .addCase(fetchRooms.fulfilled, (state: RoomsState, action: RoomsAction) => {
        state.status = "fulfilled";
        state.roomsListData = action.payload;
      })

      .addCase(addRoom.fulfilled, (state: RoomsState, action: RoomsAction) => {
        state.status = "fulfilled";
        const lastId = parseInt(
          state.roomsListData[state.roomsListData.length - 1].id.slice(2)
        );
        action.payload.id = "R-" + (lastId + 1).toString().padStart(4, "0");
        state.roomsListData.push(action.payload);
      })
      .addCase(addRoom.pending, (state: RoomsState) => {
        state.status = "pending";
      })

      .addCase(deleteRoom.fulfilled, (state: RoomsState, action: RoomsAction) => {
        state.roomsListData = state.roomsListData.filter(
          (item) => item.id !== action.payload
        );
        state.status = "fulfilled";
      })
      .addCase(deleteRoom.pending, (state: RoomsState) => {
        state.status = "pending";
      })

      .addCase(getRoom.fulfilled, (state: RoomsState, action: RoomsAction) => {
        state.singleRoomStatus = "fulfilled";
        if (typeof action.payload === "object") {
          state.singleRoomData = action.payload;
        } else {
          state.singleRoomData = state.roomsListData.find(
            (booking) => booking.id === action.payload
          );
        }
      })
      .addCase(getRoom.pending, (state: RoomsState) => {
        state.singleRoomStatus = "pending";
      })

      .addCase(editRoom.fulfilled, (state: RoomsState, action: RoomsAction) => {
        state.status = "fulfilled";
        for (let i = 0; i < state.roomsListData.length; i++) {
          if (state.roomsListData[i].id === action.payload.id) {
            state.roomsListData[i] = action.payload;
            state.singleRoomData = action.payload;
            return;
          }
        }
      })

      .addCase(editRoom.pending, (state: RoomsState) => {
        state.status = "pending";
      });
  },
});

export const getRoomsStatus = (state: RootState) => state.rooms.status;
export const getRoomsData = (state: RootState) => state.rooms.roomsListData;
export const getSingleRoom = (state: RootState) => state.rooms.singleRoomData;
export const getSingleRoomStatus = (state: RootState) => state.rooms.singleRoomStatus;

export default roomSlice.reducer;
