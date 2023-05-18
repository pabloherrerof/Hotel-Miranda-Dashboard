import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsListJson from "../../data/rooms.json";
import { delay } from "../otherFunctions";
import { Room } from "../../interfaces";

const roomsList = roomsListJson as Room[];

export const fetchRooms = createAsyncThunk<Room[], void>(
  "rooms/fetchRooms",
  async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(roomsList);
      }, 200);
    });
  }
);

export const addRoom = createAsyncThunk<Room, Room>(
  "rooms/addRoom",
  async (roomObject: Room) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(roomObject);
      }, 200);
    });
  }
);

export const getRoom = createAsyncThunk<Room["id"], Room["id"]>(
  "rooms/getRoom",
  async (roomId: Room["id"]) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(roomId);
      }, 200);
    });
  }
);

export const deleteRoom = createAsyncThunk<Room["id"], Room["id"]>(
  "rooms/deleteRooms",
  async (roomId: Room["id"]) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(roomId);
      }, 200);
    });
  }
);

export const editRoom = createAsyncThunk<Room, Room>(
  "rooms/editRoom",
  async (updatedRoomObject: Room) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(updatedRoomObject);
      }, 200);
    });
  }
);
