import { Room } from "../../interfaces";
import { RootState } from "../../app/store";
export interface RoomsState {
    roomsListData: Room[];
    status: string;
    singleRoomData: Room | undefined;
    singleRoomStatus: string;
}
export declare const roomSlice: import("@reduxjs/toolkit").Slice<RoomsState, {}, "rooms">;
export declare const getRoomsStatus: (state: RootState) => string;
export declare const getRoomsData: (state: RootState) => Room[];
export declare const getSingleRoom: (state: RootState) => Room | undefined;
export declare const getSingleRoomStatus: (state: RootState) => string;
declare const _default: import("redux").Reducer<RoomsState>;
export default _default;
