import { createSlice } from "@reduxjs/toolkit";


let userSlice = createSlice({
    name :"user",
    initialState : {
        user: null,
        allFeed : [],
        allPendingRequest : [],
        allConnectionUsers : [],
    },
    reducers : {
        addUser : (state, action)=>{
            state.user = action.payload
        },
        addAllFeeds : (state, action)=>{
            state.allFeed = action.payload
        },
        addPendingRequest : (state,action)=>{
            state.allPendingRequest = action.payload
        },
        addAllConnection : (state, action) =>{
            state.allConnectionUsers = action.payload
        },
        removeUser : (state, action)=>{
            state.user = null
        }
    }
});

export let {addUser , addAllFeeds ,addPendingRequest, addAllConnection, removeUser} = userSlice.actions;
export default userSlice.reducer;