import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, editUser, fetchUsers, getUser } from "./usersThunks";




export const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
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
            state.data = action.payload;
            state.data.forEach((obj, index) => {
                obj.id = "U-" + (index + 1).toString().padStart(4, "0");
              });
        })

        .addCase(addUser.fulfilled, (state, action) =>{
            const lastId = parseInt(state.data[state.data.length  -1].id.slice(2));    
            action.payload.id = "U-" + (lastId + 1).toString().padStart(4, "0");
            state.data.push(action.payload)
        })

        .addCase(deleteUser.fulfilled, (state, action) =>{
            state.data = state.data.filter(item => item.id !== action.payload);
            state.status = "fullfilled";
            
        })
       


        .addCase(getUser.fulfilled, (state, action) =>{
            state.singleUser = state.data.find(item =>{
                
                return item.id === action.payload
            })
           console.log(state.singleUser)
            state.singleUserStatus = "fullfilled";
        })

        .addCase(getUser.pending, (state, action) =>{
            state.singleUserStatus = "pending";
        })
        

        .addCase(editUser.fulfilled, (state,action) =>{
            state.data = state.data.filter(item => item.id !== action.payload.id);
            state.data = [action.payload, ...state.data];
        })
        
    },
})

export const getUsersStatus = (state) => state.users.status;
export const getUsersData = (state) => state.users.data;
export const getUsersSingle = (state) => state.users.singleUser;
export const getSingleUserStatus = (state) => state.users.singleUserStatus;

export default usersSlice.reducer;