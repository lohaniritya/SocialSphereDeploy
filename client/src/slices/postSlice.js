import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      allPosts : [],
      allPostByUser : [],
      loading : true
}

const postSlice = createSlice({
      name: 'posts',
      initialState,
      reducers:{
         createNewPost : (state,action)=>{
            state.allPosts.unshift(action.payload);
         },
         getAllPosts : (state, action)=>{
            state.allPosts = action.payload
         },
         
         getPostByUser : (state,action)=>{
            state.allPostByUser = action.payload
         } 
      }
})

export const {createNewPost, getAllPosts, getPostByUser} = postSlice.actions
export default postSlice.reducer