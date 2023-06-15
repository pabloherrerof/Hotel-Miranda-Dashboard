import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, editUser, fetchUsers, getUser, getLoggedUser } from "./usersThunks";
import { toastError, toastSuccess } from "../toastify";




export const usersSlice = createSlice({
    name: "users",
    initialState: {
        usersListData: [],
        status: "idle",
        singleUser: {},
        singleUserStatus: "idle",
        loggedUser: {},
        loggedUserStatus: "idle"
    },
    

    extraReducers(builder){
        builder
        .addCase(fetchUsers.rejected, (state, action) =>{
            state.status = "rejected";
            toastError("Error! Couldn't load users.");
        })
        .addCase(fetchUsers.pending, (state, action) =>{
            state.status = "pending";
        })
        .addCase(fetchUsers.fulfilled, (state, action) =>{
            state.status = "fulfilled";
            state.usersListData = action.payload;
        })

        .addCase(addUser.fulfilled, (state, action) =>{
            toastSuccess('The user has been saved!')  
            state.usersListData.push(action.payload)
            state.status = "fulfilled";
        })
        .addCase(addUser.pending, (state, action) =>{
            state.status = "pending";
        })
        .addCase(addUser.rejected, (state, action) =>{
            state.status = "rejected";
            toastError("Error! Couldn't create user.")
        })

        .addCase(deleteUser.fulfilled, (state, action) =>{
            state.usersListData = state.usersListData.filter(item => item.id !== action.payload.deletedUser.id);
            state.status = "fulfilled";
            toastSuccess('The user has been deleted!')
        })

        .addCase(deleteUser.pending, (state, action) =>{
            state.status = "pending";
        })
       
        .addCase(deleteUser.rejected, (state, action) =>{
            state.status = "rejected";
            toastError("Error! Couldn't delete the user.")
        })
        

        .addCase(getUser.fulfilled, (state, action) =>{
            state.singleUser = action.payload    
            state.singleUserStatus = "fulfilled";

        })

        .addCase(getUser.pending, (state, action) =>{
            state.singleUserStatus = "pending";
        })
        .addCase(getUser.rejected, (state, action) =>{
            state.singleUserStatus = "rejected";
            toastError("Error! Couldn't get the user.")
        })

        .addCase(getLoggedUser.fulfilled, (state, action) =>{
        state.loggedUser = action.payload
            state.loggedUserStatus = "fulfilled";
        })

        .addCase(getLoggedUser.pending, (state, ) =>{
            state.loggedUserStatus = "pending";
        })
        
        .addCase(getLoggedUser.rejected, (state, ) =>{
            state.loggedUserStatus = "rejected";
        })

        .addCase(editUser.fulfilled, (state,action) =>{
            toastSuccess('Changes saved!')
            state.singleUserStatus = "fulfilled";
             for(let i = 0; i < state.usersListData.length; i++) {
                if (state.usersListData[i].id === action.payload.id) {
                    console.log(action.payload)
                    state.usersListData[i] = action.payload;
                    state.singleUser = action.payload
                  return;
                }
              }   
        })

        .addCase(editUser.pending, (state) =>{
            state.singleUserStatus = "pending";
        })
        .addCase(editUser.rejected, (state) =>{
            state.singleUserStatus = "rejected";
            console.log("hola")
            toastError("Error! Couldn't update the user.")
        })
    },
})

export const getUsersStatus = (state) => state.users.status;
export const getUsersData = (state) => state.users.usersListData;
export const getUsersSingle = (state) => state.users.singleUser;
export const getLoggedUserData = (state) => state.users.loggedUser;
export const getSingleUserStatus = (state) => state.users.singleUserStatus;
export const getLoggedUserStatus = (state) => state.users.loggedUserStatus;

export default usersSlice.reducer;