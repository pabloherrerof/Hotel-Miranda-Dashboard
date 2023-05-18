import { User } from "../../interfaces";
import { RootState } from "../../app/store";
export interface UsersState {
    usersListData: User[];
    status: string;
    singleUser: User | undefined;
    singleUserStatus: string;
}
export declare const usersSlice: import("@reduxjs/toolkit").Slice<UsersState, {}, "users">;
export declare const getUsersStatus: (state: RootState) => string;
export declare const getUsersData: (state: RootState) => User[];
export declare const getUsersSingle: (state: RootState) => User | undefined;
export declare const getSingleUserStatus: (state: RootState) => string;
declare const _default: import("redux").Reducer<UsersState>;
export default _default;
