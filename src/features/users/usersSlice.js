import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, editUser, fetchUsers, getUser } from "./usersThunks";
import { act } from "react-dom/test-utils";




export const usersSlice = createSlice({
    name: "users",
    initialState: {
        usersListData: [],
        status: "idle",
        singleUser: {},
        singleUserStatus: "idle",
    },
    

    extraReducers(builder){
        builder
        .addCase(fetchUsers.rejected, (state, action) =>{
            state.status = "rejected";
        })
        .addCase(fetchUsers.pending, (state, action) =>{
            state.status = "pending";
        })
        .addCase(fetchUsers.fulfilled, (state, action) =>{
            state.status = "fulfilled";
            state.usersListData = action.payload;
        })

        .addCase(addUser.fulfilled, (state, action) =>{
            const lastId = parseInt(state.usersListData[state.usersListData.length  -1].id.slice(2));    
            action.payload.id = "U-" + (lastId + 1).toString().padStart(4, "0");
            state.usersListData.push(action.payload)
            console.log(state.usersListData)
        })

        .addCase(deleteUser.fulfilled, (state, action) =>{
            state.usersListData = state.usersListData.filter(item => item.id !== action.payload);
            state.status = "fullfilled";
            
        })

        .addCase(deleteUser.pending, (state, action) =>{
            state.status = "pending";
        })
       


        .addCase(getUser.fulfilled, (state, action) =>{
            if(typeof action.payload === "object"){
                state.singleUser = action.payload
            } else{
                state.singleUser = state.usersListData.find(user => user.id === action.payload)
            }
            
            state.singleUserStatus = "fullfilled";
        })

        .addCase(getUser.pending, (state, action) =>{
            state.singleUserStatus = "pending";
        })
        

        .addCase(editUser.fulfilled, (state,action) =>{
            state.status = "fulfilled";
             for(let i = 0; i < state.usersListData.length; i++) {
                if (state.usersListData[i].id === action.payload.id) {
                    state.usersListData[i] = action.payload;
                    state.singleUser = action.payload
                  return;
                }
              }
        })

        .addCase(editUser.pending, (state, action) =>{
            state.status = "pending";
        })
        
    },
})

export const getUsersStatus = (state) => state.users.status;
export const getUsersData = (state) => state.users.usersListData;
export const getUsersSingle = (state) => state.users.singleUser;
export const getSingleUserStatus = (state) => state.users.singleUserStatus;

export default usersSlice.reducer;