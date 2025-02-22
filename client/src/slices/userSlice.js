import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null,
    allUsers : []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        login: (state,action) =>{
            state.status = true,
            state.userData = action.payload
        },
        logout : (state)=>{
            state.status = false,
            state.userData = null
        },
        getUser : (state,action) => {
            state.userData = action.payload
        },
        getAllUsers : (state,action)=>{
            state.allUsers = action.payload
        },
        followUnfollowUser :(state,action)=>{
            state.userData = action.payload
        }
    }
})

export const {login, logout, getUser, getAllUsers, followUnfollowUser} =  userSlice.actions
export default userSlice.reducer